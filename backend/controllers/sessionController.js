const Session = require("../models/Session");
const Question = require("../models/Question");

// @desc    Create a session and linked questions
// @route   POST /api/sessions/create
// @access  Private
exports.createSession = async (req, res) => {
    try {
        const { role, experience, topicsToFocus, description, questions } = req.body;
        const userId = req.user._id;

        const session = await Session.create({
            user: userId,
            role,
            experience,
            topicsToFocus,
            description,
            questions: []
        });

        const questionDocs = await Promise.all(
            questions.map(async (q) => {
                const question = await Question.create({
                    session: session._id,
                    question: q.question,
                    answer: q.answer,
                })
                return question._id;
            })
        );

        session.questions = questionDocs;
        await session.save();

        res.status(201).json({ session });

    } catch (error) {
        console.error('Session creation error:', error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

// @desc    Get all sessions for the logged-in User
// @route   GET /api/sessions/my-sessions
// @access  Private
exports.getMySessions = async (req, res) => {
    try {
        console.log('User ID:', req.user._id); // Debug log
        const sessions = await Session.find ({user: req.user._id})
            .sort({createdAt: -1})
            .populate("questions");

        console.log('Found sessions:', sessions.length);
        res.status(200).json(sessions);
    } catch (error) {
        console.error('Get sessions error:', error); // Add logging
        res.status(500).json({ message: "Internal server error" });
    }
}

// @desc    Get a session by ID with populated questions
// @route   GET /api/sessions/:id
// @access  Private
exports.getSessionById = async (req, res) => {
    try {
        const session = await Session.findById(req.params.id)
            .populate({
                path: "questions",
                options: { sort: {isPinned: -1, createdAt: 1 } },
            })
            .exec();
        
        if (!session) {
            return res.status(404).json({ success: false, message: "Session not found" });
        }

        res.status(200).json({ success: true, session });

        // Check if session belongs to the user
        if (session.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized" });
        }

        res.status(200).json(session);
    } catch (error) {
        console.error('Get session by ID error:', error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// @desc    Delete a session by ID
// @route   DELETE /api/sessions/:id
// @access  Private
exports.deleteSession = async (req, res) => {
    try {
        const session = await Session.findById(req.params.id);

        if (!session) {
            return res.status(404).json({ message: "Session not found" });
        }

        // First delete all questions linked to this session
        await Question.deleteMany({ session: session._id });

        // Then, delete the session
        await session.deleteOne();

        res.status(200).json({ message: "Session deleted successfully" });
    } catch (error) {
        console.error('Delete session error:', error);
        res.status(500).json({ message: "Internal server error" });
    }
}


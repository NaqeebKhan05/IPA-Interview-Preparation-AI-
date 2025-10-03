const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Protect Middleware
const protect =  async (req, res, next) => {
    try {
        let token = req.headers.authorization;

        console.log("Auth Header:", req.headers.authorization);
        
        if (token && token.startsWith("Bearer ")) {
            token = token.split(" ")[1]; //Extract Token
            const decoded = jwt.verify(token, process.env.JWT_SECRET); //Verify Token
            req.user = await User.findById(decoded.id).select("-password"); //Find User
            next();

        } else {
            res.status(401).json({ message: "Unauthorized, no token" });
        }
    } catch (error) {
        res.status(401).json({ message: "Token Failed", error: error.message });
    }
};

module.exports = { protect };

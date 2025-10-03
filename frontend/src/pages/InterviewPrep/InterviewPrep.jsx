import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import RoleInfoHeader from "./components/RoleInfoHeader";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import moment from "moment";
import QuestionCard from "../../components/Card/QuestionCard";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { LuCircleAlert, LuListCollapse } from "react-icons/lu";
import Drawer from "../../components/Drawer";
import SkeletonLoader from "../../components/Loader/SkeletonLoader";
import AIResponsePreview from "./components/AIResponsePreview";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";

const InterviewPrep = () => {
  const { sessionId } = useParams();

  const [sessionData, setSessionData] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [openLeanMoreDrawer, setOpenLeanMoreDrawer] = useState(false);
  const [explanation, setExplanation] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateLoader, setIsUpdateLoader] = useState(false);

  //Fetch session data by session Id
  const fetchSessionDetailsById = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.SESSION.GET_ONE(sessionId)
      );

      if (response.data && response.data.session) {
        setSessionData(response.data.session);
      }
    } catch (error) {
      console.log("Error fetching the session Data", error);
    }
  };

  // Generate Concept Explanation
  const generateConceptExplanation = async (question) => {
    try {
      setErrorMsg("");
      setExplanation("");

      setIsLoading(true);
      setOpenLeanMoreDrawer(true);

      const response = await axiosInstance.post(
        API_PATHS.AI.GENERATE_EXPLANATION,
        {
          question,
        }
      );

      if (response.data) {
        setExplanation(response.data);
      }
    } catch (error) {
      setExplanation(null);
      setErrorMsg("Error generating the explanation, try again later");
      console.error("Error", error);
    } finally {
      setIsLoading(false);
    }
  };

  //Pin Question
  const toggleQuestionPinStatus = async (questionId) => {
    try {
      const response = await axiosInstance.post(
        API_PATHS.QUESTION.PIN(questionId)
      );

      console.log("Response", response);

      if (response.data && response.data.question) {
        // toast.success("Question pinned successfully");
        fetchSessionDetailsById();
      }
    } catch (error) {
      console.log("Error pinning the question", error);
    }
  };

  //Add more questions to a session
  const uploadMoreQuestions = async () => {
    try {
      setIsUpdateLoader(true);

      //Call AI API to Generate questions
      const aiResponse = await axiosInstance.post(
        API_PATHS.AI.GENERATE_QUESTIONS,
        {
          role: sessionData?.role,
          experience: sessionData?.experience,
          topicsToFocus: sessionData?.topicsToFocus,
          numberOfQuestions: 10,
        }
      );

      // Should be array like [{question: "", answer: ""},...]
      const generatedQuestions = aiResponse.data;

      const response = await axiosInstance.post(
        API_PATHS.QUESTION.ADD_TO_SESSION,
        {
          sessionId,
          questions: generatedQuestions,
        }
      );

      if (response.data) {
        toast.success("Added More Q&A!!");
        fetchSessionDetailsById();
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong, try again later");
      }
    } finally {
      setIsUpdateLoader(false);
    }
  };

  useEffect(() => {
    if (sessionId) {
      fetchSessionDetailsById();
    }

    return () => {
      // setSessionData(null);
      // setErrorMsg(null);
    };
  }, [sessionId]);

  return (
    <DashboardLayout>
      {/* Top Section  */}
      {/* Role Info */}
      <RoleInfoHeader
        role={sessionData?.role || ""}
        experience={sessionData?.experience || ""}
        topicsToFocus={sessionData?.topicsToFocus || ""}
        description={sessionData?.description || ""}
        questions={sessionData?.questions.length || ""}
        lastUpdated={
          sessionData?.updatedAt
            ? moment(sessionData?.updatedAt).format("DD-MM-YYYY")
            : ""
        }
      ></RoleInfoHeader>

      {/* INTERVIEW Q & A Section - Right=Questions || Left=Drawer */}
      <div className="container mx-auto pt-4 px-4 md:px-0">
        <h2 className="text-lg font-semibold color-black">Interview Q & A</h2>

        {/* Questions || Q & A */}
        <div className="grid grid-cols-12 gap-4 mt-5 mb-10">
          {/* Questions Section */}
          <div
            className={`col-span-12 transition-all duration-300 ${
              openLeanMoreDrawer ? "md:col-span-5" : "md:col-span-8"
            }`}
          >
            <AnimatePresence>
              {sessionData?.questions?.map((data, index) => {
                return (
                  <motion.div
                    key={data?._id || index}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      duration: 0.4,
                      type: "spring",
                      stiffness: 100,
                      damping: 15,
                      delay: index * 0.1,
                    }}
                    layout
                    layoutId={`question-${data?._id || index}`}
                  >
                    <>
                      <QuestionCard
                        question={data?.question}
                        answer={data?.answer}
                        onLearnMore={() =>
                          generateConceptExplanation(data.question)
                        }
                        isPinned={data?.isPinned}
                        onTogglePin={() => toggleQuestionPinStatus(data._id)}
                      />

                      {!isLoading &&
                        sessionData?.questions?.length == index + 1 && (
                          <div className="flex items-center justify-center mt-5">
                            <button
                              className="flex items-center gap-3 text-sm text-white font-medium bg-black px-5 py-2 mr-2 rounded text-nowrap cursor-pointer"
                              disabled={isLoading || isUpdateLoader}
                              onClick={uploadMoreQuestions}
                            >
                              {isUpdateLoader ? (
                                <SpinnerLoader />
                              ) : (
                                <LuListCollapse className="text-lg" />
                              )}
                              {""}
                              Load More
                            </button>
                          </div>
                        )}
                    </>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Drawer Section - DESKTOP & TABLET */}
          {openLeanMoreDrawer && (
            <div className="hidden md:block md:col-span-7">
              <div className="fixed top-20 right-0 w-[calc(58.333%-2rem)] max-w-[700px] h-[calc(100vh-5rem)]">
                {/* NOTE: inline={true} -> panel-only: header + body (body is scrollable) */}
                <Drawer
                  inline={true}
                  isOpen={openLeanMoreDrawer}
                  onClose={() => setOpenLeanMoreDrawer(false)}
                  title={!isLoading && explanation?.title}
                >
                  {errorMsg && (
                    <p className="flex gap-2 text-sm text-amber-600 font-medium">
                      <LuCircleAlert className="text-red-500 mt-1" />
                      {errorMsg}
                    </p>
                  )}
                  {isLoading && <SkeletonLoader />}
                  {!isLoading && explanation && (
                    <AIResponsePreview content={explanation?.explanation} />
                  )}
                </Drawer>
              </div>
            </div>
          )}

          {/* Drawer Section - MOBILE */}
          {openLeanMoreDrawer && (
            <div className="block md:hidden">
              {/* mobile keeps overlay behavior (no inline) */}
              <Drawer
                isOpen={openLeanMoreDrawer}
                onClose={() => setOpenLeanMoreDrawer(false)}
                title={!isLoading && explanation?.title}
              >
                {errorMsg && (
                  <p className="flex gap-2 text-sm text-amber-600 font-medium">
                    <LuCircleAlert className="text-red-500 mt-1" />
                    {errorMsg}
                  </p>
                )}
                {isLoading && <SkeletonLoader />}
                {!isLoading && explanation && (
                  <AIResponsePreview content={explanation?.explanation} />
                )}
              </Drawer>
            </div>
          )}

        </div>
      </div>
    </DashboardLayout>
  );
};

export default InterviewPrep;

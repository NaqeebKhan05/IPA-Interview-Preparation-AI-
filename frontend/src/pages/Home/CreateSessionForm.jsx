import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const CreateSessionForm = () => {

  const [formData, setFormData] = useState({
    role: "",
    topicsToFocus: "",
    experience: "",
    description: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handleCreateSession = async (e) => {
    e.preventDefault();

    const { role, topicsToFocus, experience } = formData;

    if (!role || !topicsToFocus || !experience) {
      setError("All fields are required");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      // Call AI API to generate questions
      const aiResponse = await axiosInstance.post(
        API_PATHS.AI.GENERATE_QUESTIONS,
        {
          role,
          topicsToFocus,
          experience,
          numberOfQuestions: 10,
        }
      );

      // Should be array like [{question: "", answer: ""}, ...]
      const generatedQuestions = aiResponse.data;

      const response = await axiosInstance.post(API_PATHS.SESSION.CREATE, {
        ...formData,
        questions: generatedQuestions,
      });

      if (response.data?.session?._id) {
        navigate(`/interview-prep/${response.data?.session?._id}`);
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[90vw] md:w-[35vw] p-7 flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-black">
        Start a New Interview Journey
      </h3>
      <p className="text-xs text-slate-700 mt-[5px] mb-3">
        Fill the form below to create a new interview session
      </p>
      <form onSubmit={handleCreateSession} className="flex flex-col gap-3">
        <Input
          type="text"
          value={formData.role}
          label="Target Role"
          onChange={({ target }) => handleChange("role", target.value)}
          placeholder="(e.g. Software Engineer, UI/UX Designer, Frontend Developer)"
        />
        <Input
          type="number"
          value={formData.experience}
          label="Years of Experience"
          onChange={({ target }) => handleChange("experience", target.value)}
          placeholder="(e.g. 1 year, 2 year, 3 year)"
        />
        <Input
          type="text"
          value={formData.topicsToFocus}
          label="Topics to Focus on"
          onChange={({ target }) => handleChange("topicsToFocus", target.value)}
          placeholder="(Comma-seperated, e.g. React, Node.js, JavaScript)"
        />
        <Input
          type="text"
          value={formData.description}
          label="Description"
          onChange={({ target }) => handleChange("description", target.value)}
          placeholder="(e.g. I am looking for a job as a Software Engineer)"
        />

        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

        <button
          type="submit"
          className="btn-primary w-full mt-2"
          disabled={isLoading}
        >
          {isLoading && <SpinnerLoader />} Create Session
        </button>
      </form>
    </div>
  );
};

export default CreateSessionForm;

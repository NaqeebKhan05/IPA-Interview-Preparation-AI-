import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";
import ProfilePhotoSelector from "../../components/Input/ProfilePhotoSelector";
import { validateEmail } from "../../utils/helper";
import { UserContext } from "../../context/userContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import uploadImage from "../../utils/uploadImage";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Handle Sign Up Form Submit
  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if (!fullName) {
      setError("Please enter full name.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Password is required to enter");
      return;
    }

    setError("");
    setIsLoading(true);

    //Sign Up API Call
    try {
      // Upload Image if Present
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }

      // Sign Up User
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
        profileImageUrl,
      });

      const { token, ...userData } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser({ token, ...userData });
        // Add 3-second delay before navigation
        setTimeout(() => {
          setIsLoading(false);
          navigate("/dashboard");
        }, 3000);
      }
    } catch (error) {
      setIsLoading(false);
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[90vw] md:w-[330px] p-7 flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-black">Create an Account</h3>
      <p className="text-xs text-slate-700 mt-[5px] mb-6">
        Join us today by entering your details below.
      </p>

      <form onSubmit={handleSignUp}>
        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

        <div className="grid grid-cols-1 gap-2">
          <Input
            type="text"
            placeholder="john doe"
            value={fullName}
            onChange={({ target }) => setFullName(target.value)}
            label="Full Name"
          />

          <Input
            type="email"
            placeholder="john@example.com"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
          />

          <Input
            type="password"
            placeholder="Min 8 characters"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
          />

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

          <button type="submit" className="btn-primary" disabled={isLoading}>

            {isLoading ? <SpinnerLoader /> : "SIGN UP"}
          </button>

          <p className="text-[13px] text-slate-800 mt-3">
            Already have an account?{" "}
            <button
              className="text-primary font-medium underline cursor-pointer"
              onClick={() => {
                setCurrentPage("login");
              }}
              disabled={isLoading}
            >
              Login
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;

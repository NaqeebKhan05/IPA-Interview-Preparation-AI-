import React from "react";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

const ProfileInfoCard = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/");
  };

  return (
    user && (
    <div className="flex items-center mr-4 md:mr-10">
      <img
        src={user?.profileImageUrl}
        alt="Profile"
        className="w-11 h-11 bg-gray-300 rounded-full mr-3"
      />
      <div className="text-[15px] font-bold text-black leading-3">
        {user.name || ""}
        <br/>
        <button
          className="text-amber-600 text-sm font-semibold cursor-pointer hover:underline mt-2"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
    )
  );
};

export default ProfileInfoCard;

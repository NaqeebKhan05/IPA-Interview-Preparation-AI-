import React, { useState, useEffect } from "react";
import { LuPlus } from "react-icons/lu";
import { CARD_BG } from "../../utils/data";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import SummaryCard from "../../components/Card/SummaryCard";
import moment from "moment";
import Model from "../../components/Model";
import CreateSessionForm from "./CreateSessionForm";
import DeleteAlertContent from "../../components/DeleteAlertContent";

const Dashboard = () => {
  const navigate = useNavigate();

  const [openCreateModel, setOpenCreateModel] = useState(false);
  const [sessions, setSessions] = useState([]);

  const fetchAllSessions = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
      setSessions(response.data);
      // For easy debugging
      // console.log(
      //   "GET /my-sessions status",
      //   response.status,
      //   "data",
      //   response.data
      // );
    } catch (error) {
      console.log("Error fetching the session Data", error);
    }
  };

  // Delete Section

  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null,
  });

  const deleteSession = async (sessionData) => {
    try {
      await axiosInstance.delete(API_PATHS.SESSION.DELETE(sessionData?._id));
      fetchAllSessions();
      toast.success("Session deleted successfully");
      setOpenDeleteAlert({
        open: false,
        data: null,
      });
    } catch (error) {
      console.log("Error deleting the session", error);
    }
  };

  useEffect(() => {
    fetchAllSessions();
  }, []);

  return (
    <DashboardLayout>
      <div className="container mx-auto pt-4 pb-4">
        {sessions.length === 0 ? (
          <p className="text-center text-gray-500">No sessions found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-1 pb-6 px-4 md:px-0">
            {sessions?.map((data, index) => (
              <SummaryCard
                key={data?._id}
                colors={CARD_BG[index % CARD_BG.length]}
                role={data?.role || ""}
                topicsToFocus={data?.topicsToFocus || ""}
                experience={data?.experience || "-"}
                questions={data?.questions.length || "-"}
                description={data?.description || ""}
                lastUpdated={
                  data?.updatedAt
                    ? moment(data?.updatedAt).format("DD-MM-YYYY")
                    : ""
                }
                onSelect={() => navigate(`/interview-prep/${data?._id}`)}
                onDelete={() =>
                  setOpenDeleteAlert({
                    open: true,
                    data: data,
                  })
                }
              />
            ))}
          </div>
        )}
        <button
          className="flex items-center justify-center gap-3 bg-linear-to-r from-[#FF9324] to-[#e99a4b] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-black hover:text-white transition-colors cursor-pointer hover:shadow-2xl hover:shadow-orange-300 fixed bottom-10 md:bottom-20 right-10 md:right-10"
          onClick={() => setOpenCreateModel(true)}
        >
          <LuPlus className="text-2xl text-white" />
          Add New
        </button>
      </div>

      <Model
        isOpen={openCreateModel}
        onClose={() => setOpenCreateModel(false)}
        hideHeader
      >
        <div>
          <CreateSessionForm />
        </div>
      </Model>

      <Model
        isOpen={openDeleteAlert.open}
        onClose={() => setOpenDeleteAlert({ open: false, data: null })}
        title="Delete Session"
      >
        <div className="w-[30vw]">
          <DeleteAlertContent
            content="Are you sure you want to delete this session?"
            onDelete={() => deleteSession(openDeleteAlert.data)}
          />
        </div>
      </Model>
    </DashboardLayout>
  );
};

export default Dashboard;

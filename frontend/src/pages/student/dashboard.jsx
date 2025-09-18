import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [activeClass,setActiveClass]=useState();
  const [status,setStatus]=useState();
  const [classID,setClassID]=useState();
  const [marked,setMarked]=useState(false);
  let longitude,latitude;

  const apiUrl = import.meta.env.VITE_API_URL;
      
  const token= localStorage.getItem("token");
  const role = localStorage.getItem("role");
      
  useEffect(()=>{
          if(token){
              if(role==="teacher")
                  navigate("/teacher/dashboard")
          }
          else{
              navigate("/role")
          }
        },[]);

  useEffect(() => {
  const fetchActive = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/v1/active`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.hasActive) {
        setActiveClass(response.data.ActiveClass);
        setClassID(response.data.ActiveClass.classId);
      }
    } catch (err) {
      console.error("Error fetching active class:", err);
    }
  };
  fetchActive();
}, []);
      

  const handleAttendances = () => {
    navigate("/student/attended");
  };

  const handleMark = async () => {
          if (!navigator.geolocation) {
              setError("Geolocation is not supported by your browser.");
              return;
          }
          navigator.geolocation.getCurrentPosition(
              async (position) => {
                      latitude =position.coords.latitude
                      longitude=position.coords.longitude
  
                      const response=await axios.post(
                        `${apiUrl}/api/v1/student/mark`,
                        {
                            classId:classID,
                            latitude,
                            longitude
                        },{
                            headers:{
                                Authorization:`Bearer ${token}`
                            }
                        }
                    );
      if(response.data.marked){
         setStatus(response.data.message);
         setMarked(true)
     }
     else{
         setStatus(response.data.message);
     }
              },
              () => setError("Unable to retrieve your location.")
          );
      };

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    navigate("/role")
  };

  return (
    <div className="min-h-screen bg-sky-200 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm text-center">
        <h2 className="text-2xl font-semibold text-blue-600 mb-6">Active Class</h2>

        {activeClass&&<div className="text-left text-gray-700 space-y-2 mb-8 text-[1.05rem] leading-relaxed">
          <p>
            <strong>Subject:</strong> {activeClass.subject}
          </p>
          <p>
            <strong>Teacher:</strong> {activeClass.teacher}
          </p>
          <p>
            <strong>Date:</strong> {activeClass.createdAt}
          </p>
        </div>}

        <div className="flex flex-col gap-4">

           {activeClass&&(!marked)&& <button
            onClick={handleMark}
            className="px-6 py-3 rounded-lg bg-green-600 text-white font-bold text-lg hover:bg-blue-700 transition-colors"
          >
            Mark Your Attendance
          </button>}

          {status&&<div
            className="px-6 py-3 rounded-lg bg-green-600 text-white font-bold text-lg hover:bg-blue-700 transition-colors"
          >
            {status}
          </div>}

          <button
            onClick={handleAttendances}
            className="px-6 py-3 rounded-lg bg-blue-600 text-white font-bold text-lg hover:bg-blue-700 transition-colors"
          >
            View Attended Classes
          </button>

          <button
            onClick={handleLogout}
            className="px-6 py-3 rounded-lg bg-red-500 text-white font-bold text-lg hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

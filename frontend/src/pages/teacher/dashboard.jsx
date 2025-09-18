import React, { useState,useEffect} from "react";
import { useNavigate} from "react-router-dom";
import axios from "axios"

const subjects = [
    "Industrial Sociology",
    "CAIT",
    "Discrete Mathematics",
    "DSUC",
    "AIMES",
    "DLD",
    "Yoga"
];

export default function Tdashboard() {
    const [selectedSubject, setSelectedSubject] = useState("");
    const [error, setError] = useState("");
    const [status,setStatus]=useState("Create Session");
    const [classID,setclassID]=useState();
    let longitude,latitude;

    const navigate=useNavigate();

    const apiUrl = import.meta.env.VITE_API_URL;
    
    const token= localStorage.getItem("token");
    const role = localStorage.getItem("role");
    
    useEffect(()=>{
        if(token){
            if(role==="student")
                navigate("/student/dashboard")
        }
        else{
            navigate("/role")
        }
    },[])

    const handleClick=()=>{
        console.log("inside HC")
        if(status==="Create Session")
            handleStartSession()
        else if(status==="End Session")
            handleEndSession()
    }

    const handleStartSession = async () => {
        console.log("Inside handleSS")
        setStatus("Wait..")
        setError("");
        if (!selectedSubject) {
            setError("Please select a subject.");
            return;
        }
        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser.");
            return;
        }
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                    latitude =position.coords.latitude
                    longitude=position.coords.longitude
                    console.log("inside geol")

                    const response=await axios.post(
            `${apiUrl}/api/v1/teacher/create`,
            {
                subject:selectedSubject,
                latitude,
                longitude
            },{
                headers:{
                    Authorization:`Bearer ${token}`
            }
        }

    );
    if(response.data.created){
       setclassID(response.data.classId);
       setStatus("End Session")
   }
   else{
       setError(response.data.message);
   }
            },
            () => setError("Unable to retrieve your location.")
        );
    };

    const handleEndSession = () => {
        navigate("/teacher/session?classId="+classID)
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-sky-200 p-4">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center text-indigo-800">
                    Start Attendance Session
                </h1>
                <div>
                        <label className="block mb-2 text-gray-700 font-medium">
                            Select Subject
                        </label>
                        <select
                            className="w-full mb-4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            value={selectedSubject}
                            onChange={(e) => setSelectedSubject(e.target.value)}
                        >
                            <option value="">Choose a subject </option>
                            {subjects.map((subject) => (
                                <option key={subject} value={subject}>
                                    {subject}
                                </option>
                            ))}
                        </select>
                        <button
                            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
                            onClick={handleClick}
                        >
                            {status}
                        </button>
                        {error && (
                            <div className="mt-4 text-red-600 text-center">{error}</div>
                        )}
                    </div>
                    </div>
            </div>
    );
}
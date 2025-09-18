import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/loader";

export default function Attended() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const token = localStorage.getItem("token"); 
        const res = await axios.get(`${apiUrl}/api/v1/student/attended`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setClasses(res.data.classes || []);
      } catch (err) {
        console.error("Error fetching attended classes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

   if (loading) {
      return (
        <div>
          <Loader />
        </div>
      )}
      else{
        if (classes.length === 0) {
            return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-gray-500 text-lg">No classes attended yet </p>
                </div>
                );
            }

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Attended Classes</h1>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Total Classes Attended: {classes.length}</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {classes.map((cls) => (
          <div
            key={cls._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow p-5"
          >
            <h2 className="text-xl font-semibold text-indigo-600 mb-2">
              {cls.subject || "Untitled Class"}
            </h2>
            {/* <p className="text-gray-700">
              <span className="font-medium">Teacher:</span>{" "}
              {cls.teacher || "Unknown"}
            </p> */}
            <p className="text-gray-700">
              <span className="font-medium">Time:</span>{" "}
              {cls.createdAt || "Not specified"}
            </p>
          </div>
        ))}
      </div>
    </div>
  )};
}

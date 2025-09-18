import React,{useState,useEffect} from "react";
import { useNavigate,useSearchParams } from "react-router-dom";
import Loader from '../../components/loader';
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function Session(){
    const navigate = useNavigate();
    const [loading,setLoading]=useState(true);
    const [searchParam]=useSearchParams();
    const classId=searchParam.get("classId")
    const [students,setStudents]=useState([]);
    const [number,setNumber]=useState();

    const token= localStorage.getItem("token");
    const apiUrl = import.meta.env.VITE_API_URL;


    useEffect(()=>{
        try{
        const fetchStudent=async ()=>{
        if(token&&classId){
            const response= await axios.post(
                `${apiUrl}/api/v1/teacher/end`,
            {
                classId
            },{
                headers:{
                    Authorization:`Bearer ${token}`
            }
        }
            )
            if(response.data.ended){
                setStudents(response.data.students)
                setNumber(response.data.students.length)
                setLoading(false)
            }
        }
        else{
            navigate("/teacher/dashboard")
        }

    }
fetchStudent()
}catch (err) {
  console.error(err);
} finally {
  setLoading(false);
}
},[])

const downloadPDF = () => {
    console.log("clicked")
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Present Student List", 14, 20);

    const tableColumn = ["Name", "Roll Number"];
    const tableRows = [];

    students.forEach((student) => {
      const studentData = [student.name, student.classRoll];
      tableRows.push(studentData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });

    doc.save("present-students.pdf"+Date.now());
  };
    

    if (loading) {
        return (
          <div>
            <Loader />
          </div>
        );
      } else {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8 px-4">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Student List</h1>
            {/* <button onClick={downloadPDF} className="mb-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Download PDF
            </button> */}
            <h1 className="w-full max-w-md mb-3 text-2xl">Total Students Present : {number}</h1>
            <ul className="w-full max-w-md space-y-4">
                {students.map((student) => (
                    <li
                        key={student._id}
                        className="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row sm:items-center justify-between"
                    >
                        <span className="text-lg font-medium text-gray-700">{student.name}</span>
                        <span className="text-sm text-gray-500 mt-1 sm:mt-0">{student.classRoll}</span>
                    </li>
                ))}
            </ul>
        </div>
    );}
};


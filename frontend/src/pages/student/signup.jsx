import { useNavigate } from "react-router-dom"
import { GrHome } from "react-icons/gr"
import {useRef,useEffect, useState} from "react"
import Loader from "../../components/loader"
import axios from "axios"
export default function Ssignup() {
  const navigate = useNavigate();
  const nameRef = useRef();
  const gmailRef = useRef();
  const passwordRef = useRef();
  const rollRef=useRef();
  const [error,setError] = useState(``);
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  const token= localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(()=>{
    if(token){
      if(role==="teacher")
      navigate("/teacher/dashboard")
    else if(role==="student")
      navigate("/student/dashboard")
     }
  },[])

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  } else {
    return (
      <div className="min-h-screen w-full bg-black relative">
        <div
          className="absolute inset-0 z-0"
          style={{
            background: "#000000",
            backgroundImage: `
              radial-gradient(circle at 1px 1px, rgba(139, 92, 246, 0.2) 1px, transparent 0),
              radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.18) 1px, transparent 0),
              radial-gradient(circle at 1px 1px, rgba(236, 72, 153, 0.15) 1px, transparent 0)
            `,
            backgroundSize: "20px 20px, 30px 30px, 25px 25px",
            backgroundPosition: "0 0, 10px 10px, 15px 5px",
          }}
        />
        <div
          onClick={() => navigate("/")}
          className="absolute text-white text-2xl m-3 cursor-pointer"
        >
          <GrHome />
        </div>
        <div className="bg-white w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-xl shadow-lg p-6 md:p-8">
          <div className="text-3xl font-bold font-sans text-center mt-2">Sign Up</div>
          <div className="text-lg text-gray-500 mt-2 text-center">
            Enter your information to create an
            <p className="inline md:block ml-2 md:ml-0">account</p>
          </div>
          <div className="mt-4">
            <p className="font-medium">Name</p>
            <input
              ref={nameRef}
              type="text"
              onChange={()=>setError('')}
              className="border border-gray-300 rounded h-9 w-full mt-2 pl-2 text-gray-600"
            />
          </div>
          <div className="mt-3">
            <p className="font-medium">Class Roll No.</p>
            <input
              ref={rollRef}
              type="text"
              onChange={()=>setError('')}
              className="border border-gray-300 rounded h-9 w-full mt-2 pl-2 text-gray-600"
            />
          </div>
          <div className="mt-3">
            <p className="font-medium">Email</p>
            <input
              ref={gmailRef}
              onChange={()=>setError('')}
              type="text"
              className="border border-gray-300 rounded h-9 w-full mt-2 pl-2 text-gray-600"
            />
          </div>
          <div className="mt-3">
            <p className="font-medium">Password</p>
            <input
              ref={passwordRef}
              type="password"
              onChange={()=>setError('')}
              className="border border-gray-300 rounded h-9 w-full mt-2 pl-2 text-gray-600"
            />
          </div>
          {error&&
          <div className="w-full rounded mt-4 text-red-600 font-medium">{error}</div>
          }
          <button
            className="mt-5 bg-blue-700 hover:bg-blue-600 text-white rounded h-12 w-full font-medium cursor-pointer transition"
            onClick={async () => {
              const name = nameRef.current.value;
              const rollno=rollRef.current.value;
              const gmail = gmailRef.current.value;
              const password = passwordRef.current.value;
              if (!name) 
                setError("Enter your Name");
              else if (!(rollno)) 
                setError("Enter your Class Roll No.");
              else if (!(gmail.endsWith("bbdu.ac.in")))
                setError("Enter email given by university(@bbdu.ac.in)");
              else if (!(password.length > 6))
                setError("Password must be more than 6 characters long");
              else {
                setLoading(true);
                const response = await axios.post(
                  `${apiUrl}/api/v1/student/signup`,
                  {
                    name,
                    rollno,
                    gmail,
                    password,
                  }
                );
                if (response.data.isLogin) {
                  localStorage.setItem("token", response.data.token);
                  localStorage.setItem("role", response.data.role);
                  navigate("/teacher/dashboard");
                } else {
                  setLoading(false);
                  setError(response.data.message);
                }
              }
            }}
          >
            Sign Up
          </button>
          <div className="font-medium text-sm text-gray-800 mt-4 text-center">
            Already have an account?
            <span
              className="ml-2 cursor-pointer text-blue-700 underline"
              onClick={() => navigate("/teacher/login")}
            >
              Login
            </span>
          </div>
        </div>
      </div>
    );
  }
}
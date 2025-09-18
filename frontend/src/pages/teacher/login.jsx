import { useNavigate } from "react-router-dom"
import { GrHome } from "react-icons/gr"
import axios from "axios"
import { useRef,useEffect,useState} from "react"
import Loader from "../../components/loader"
export default function Tlogin() {
  const navigate = useNavigate();
  const gmailRef = useRef();
  const passwordRef = useRef();
  const [error,setError] = useState(``);
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
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
      <div className="min-h-screen w-full bg-black relative flex items-center justify-center">
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
          className="absolute text-white text-2xl m-3 cursor-pointer top-0 left-0"
        >
          <GrHome />
        </div>
        <div className="bg-white w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-md xl:max-w-md p-8 sm:p-10 rounded-xl shadow-lg relative z-10 flex flex-col items-center mx-4">
          <div className="text-3xl font-bold font-sans text-center mt-2">Log In</div>
          <div className="text-[16px] font-medium text-gray-500 mt-2 text-center">
            Enter your credentials to access
            <p>your account</p>
          </div>
          <div className="w-full mt-4">
            <p className="font-medium">Gmail</p>
            <input
              ref={gmailRef}
              type="text"
              onChange={()=>setError('')}
              className="border border-gray-300 rounded h-9 w-full mt-2 pl-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="w-full mt-3">
            <p className="font-medium">Password</p>
            <input
              ref={passwordRef}
              type="password" onChange={()=>setError('')}
              className="border border-gray-300 rounded h-9 w-full mt-2 pl-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          {error&&
          <div className="w-full rounded mt-4 text-red-600 font-medium">{error}</div>
          }
          <button
            className="w-full mt-5 bg-blue-700 hover:bg-blue-600 text-white rounded h-12 font-medium cursor-pointer transition-colors"
            onClick={async () => {
              const gmail = gmailRef.current.value;
              const password = passwordRef.current.value;
              if (!(gmail.endsWith("bbdu.ac.in")))
                setError("Enter email given by university(@bbdu.ac.in)");
              else if (!(password.length > 6))
                setError("Password must be more than 6 characters long");
              else {
                setLoading(true);
                const response = await axios.post(
                  `${apiUrl}/api/v1/teacher/login`,
                  {
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
            Log in
          </button>
          <div className="font-medium text-sm text-gray-800 mt-4 text-center">
            Don't have an account?
            <span
              className="ml-2 cursor-pointer underline text-blue-700"
              onClick={() => navigate("/teacher/signup")}
            >
              Sign Up
            </span>
          </div>
        </div>
      </div>
    );
  }
}
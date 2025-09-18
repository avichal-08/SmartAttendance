import Button from "../components/button";
import { useNavigate } from "react-router-dom";
export default function Role(){
    const navigate=useNavigate();
    const Click=(role)=>{
        navigate(`/${role}/login`)
    };
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-sky-200 px-4">
            <div className="text-3xl md:text-5xl font-bold mb-12 text-center drop-shadow-lg">
                Please Define Your Role
            </div>
            <div className="flex flex-col md:flex-row gap-8 w-full max-w-md justify-center">
                <Button
                    style="bg-white hover:bg-blue-500 hover:text-white transition font-bold text-2xl md:text-3xl py-4 px-8 rounded-lg shadow-md w-full"
                    text="Teacher"
                    fn={() => Click("teacher")}
                />
                <Button
                    style="bg-white hover:bg-blue-500 hover:text-white transition font-bold text-2xl md:text-3xl py-4 px-8 rounded-lg shadow-md w-full"
                    text="Student"
                    fn={() => Click("student")}
                />
            </div>
        </div>
    );
}
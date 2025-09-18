import React from "react";

export default function About(){
    return (
        <div className="min-h-screen bg-sky-200 flex items-center justify-center px-4 py-12">
            <div className="max-w-3xl w-full bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-center">
                    About SmartAttendance
                </h1>
                <p className="text-gray-600 text-lg mb-6 text-center">
                    SmartAttendance is a modern solution designed to simplify and automate attendance tracking.
                </p>
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-700 mb-2">Our Mission</h2>
                        <p className="text-gray-600">
                            We aim to provide a seamless and efficient way to manage attendance, reduce manual errors, and save valuable time for administrators and users alike.
                        </p>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-700 mb-2">Key Features</h2>
                        <ul className="list-disc list-inside text-gray-600 space-y-1">
                            <li>Real-time attendance tracking</li>
                            <li>Elimination of Manual Paperwork</li>
                            <li>Detailed analytics and reporting</li>
                            <li>Transparency in attendance records</li>
                            <li>Secure and reliable</li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 text-center">
                    <span className="text-gray-500 text-sm">
                        &copy; {new Date().getFullYear()} SmartAttendance. All rights reserved.
                    </span>
                </div>
            </div>
        </div>
    );
};
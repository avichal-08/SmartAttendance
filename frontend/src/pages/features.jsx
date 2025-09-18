import React from "react";

const features = [
    {
        title: "Real-time Attendance",
        description: "Track attendance instantly with live updates and analytics.",
        icon: (
            <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M5 13l4 4L19 7" />
            </svg>
        ),
    },
    {
        title: "Geo Fencing",
        description: "Seamless and secure geo-fencing check for easy check-ins.",
        icon: (
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
            </svg>
        ),
    },
    {
        title: "Face Recognition",
        description: "Seamless and secure face recognition for easy check-ins.",
        icon: (
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="3" />
                <path d="M2 12C2 6.48 6.48 2 12 2s10 4.48 10 10-4.48 10-10 10S2 17.52 2 12z" />
            </svg>
        ),
    },
    {
        title: "Detailed Reports",
        description: "Generate and export comprehensive attendance reports.",
        icon: (
            <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
        ),
    },
];

export default function Features() {
    return (
        <div className="min-h-screen bg-sky-200 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-4">SmartAttendance Features</h2>
                <p className="text-gray-600 mb-10">
                    Discover the powerful features that make attendance management effortless and efficient.
                </p>
            </div>
            <div className="max-w-5xl mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {features.map((feature, idx) => (
                    <div
                        key={idx}
                        className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow"
                    >
                        <div className="mb-4">{feature.icon}</div>
                        <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                        <p className="text-gray-500">{feature.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
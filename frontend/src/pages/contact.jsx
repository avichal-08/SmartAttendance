import React from "react";

const developers = [
    {
        name: "Aditya Mall",
        github: "https://github.com/AdityaMall1093"
    },
    {
        name: "Anuj Pal",
        github: "https://github.com/DerangedCode"
    },
    {
        name: "Ayush Mishra",
        github: "https://github.com/Ayushmishra6267"
    },
    {
        name: "Vansh Sharma",
        github: "https://github.com/vanshsharma3777"
    },
    {
        name: "Avichal Pandey",
        github: "https://github.com/avichal-08"
    }
];

export default function Contact() {
    return (
        <div className="min-h-screen bg-sky-200 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Contact Us</h2>
                <div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">Our Developers</h3>
                    <ul className="space-y-3">
                        {developers.map((dev) => (
                            <li key={dev.github} className="text-center">
                                <span className="font-medium">{dev.name}</span>:{" "}
                                <a
                                    href={dev.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 underline"
                                >
                                    {dev.github.replace("https://github.com/", "@")}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

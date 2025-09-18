export default function Landing(){
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-sky-200 px-2 sm:px-4">
            <nav className="w-full max-w-6xl flex flex-col sm:flex-row justify-between items-center py-6">
                <div className="flex items-center gap-2">
                    <span className="text-3xl font-extrabold text-indigo-700 tracking-tight drop-shadow-lg">SmartAttendance</span>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 mt-3 sm:mt-0">
                    <a href="/features" className="text-indigo-700 hover:bg-indigo-50 px-4 py-2 rounded transition font-medium">Features</a>
                    <a href="/about" className="text-indigo-700 hover:bg-indigo-50 px-4 py-2 rounded transition font-medium">About</a>
                    <a href="/contact" className="text-indigo-700 hover:bg-indigo-50 px-4 py-2 rounded transition font-medium">Contact</a>
                </div>
            </nav>
            <main className="flex-1 flex flex-col items-center justify-center text-center w-full">
                <div className="bg-indigo-50 rounded-3xl shadow-2xl p-8 sm:p-12 max-w-2xl w-full mb-8 border border-indigo-100">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-indigo-700 mb-4 drop-shadow-lg leading-tight">
                        Effortless Attendance <span className="text-pink-400">Management</span>
                    </h1>
                    <p className="text-lg sm:text-xl md:text-2xl text-indigo-500 mb-8 max-w-xl mx-auto">
                        Streamline your attendance process with <span className="font-semibold text-indigo-700">SmartAttendance</span>. Fast, secure, and easy to use for teachers and students.
                    </p>
                    <a
                        href="/role"
                        className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold px-8 py-3 rounded-full shadow-lg hover:scale-105 hover:from-purple-600 hover:to-pink-600 transition-transform duration-200"
                    >
                        Get Started
                    </a>
                </div>
            </main>
            <footer className="w-full max-w-6xl mx-auto py-6 text-center text-indigo-500 text-xs sm:text-sm px-2">
                &copy; {new Date().getFullYear()} <span className="font-semibold">SmartAttendance</span>. All rights reserved.
            </footer>
        </div>
    )
}
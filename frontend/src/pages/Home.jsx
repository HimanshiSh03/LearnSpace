import { motion } from "framer-motion";
import { Book, Kanban, PenTool, Users, Github } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "../components/LearnSpace logo.png";


export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">

            {/* Navbar */}
            <nav className="flex justify-between px-10 py-6 items-center bg-white shadow-sm">
                <div className="flex items-center gap-3">
                    <img src={Logo} alt="LearnSpace logo" className="w-10 h-10 object-contain" />
                    <h1 className="text-2xl font-bold text-indigo-600">LearnSpace</h1>
                </div>

                <div className="flex gap-8 text-lg">
                    <Link to="/">Home</Link>
                    <Link to="/kanban">Kanban</Link>
                    <Link to="/books">BookSpace</Link>
                    <Link to="/whiteboard">Whiteboard</Link>
                    <Link to="/contributors">Contributors</Link>
                </div>
            </nav>

            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mt-20"
            >
                <h2 className="text-5xl font-extrabold text-gray-800">
                    Your Personal Learning & Productivity Hub
                </h2>
                <p className="text-xl text-gray-600 mt-4">
                    Organize your tasks, learn efficiently, and collaborate effortlessly.
                </p>

                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="mt-8 inline-block"
                >
                    <Link
                        to="/kanban"
                        className="px-8 py-3 bg-indigo-600 text-white rounded-xl shadow-md text-lg font-semibold"
                    >
                        Enter Workspace
                    </Link>
                </motion.div>
            </motion.div>

            {/* Feature Section */}
            <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-10 px-16 pb-20">

                {/* Kanban */}
                <motion.div
                    whileHover={{ scale: 1.04 }}
                    className="p-6 bg-white rounded-2xl shadow-lg flex flex-col items-center"
                >
                    <Kanban className="w-12 h-12 text-indigo-600" />
                    <h3 className="text-xl font-bold mt-4">Kanban Board</h3>
                    <p className="text-gray-600 text-center mt-2">
                        Plan your tasks and track your productivity with a clean Kanban UI.
                    </p>
                </motion.div>

                {/* BookSpace */}
                <motion.div
                    whileHover={{ scale: 1.04 }}
                    className="p-6 bg-white rounded-2xl shadow-lg flex flex-col items-center"
                >
                    <Book className="w-12 h-12 text-indigo-600" />
                    <h3 className="text-xl font-bold mt-4">BookSpace</h3>
                    <p className="text-gray-600 text-center mt-2">
                        Explore curated books, notes, and learning resources.
                    </p>
                </motion.div>

                {/* Whiteboard */}
                <motion.div
                    whileHover={{ scale: 1.04 }}
                    className="p-6 bg-white rounded-2xl shadow-lg flex flex-col items-center"
                >
                    <PenTool className="w-12 h-12 text-indigo-600" />
                    <h3 className="text-xl font-bold mt-4">Whiteboard</h3>
                    <p className="text-gray-600 text-center mt-2">
                        Draw ideas, brainstorm concepts, and sketch for clarity.
                    </p>
                </motion.div>

            </div>

            {/* Bottom Section */}
            <div className="px-16 grid grid-cols-1 md:grid-cols-2 gap-10 pb-20">

                {/* Contributors */}
                <motion.div
                    whileHover={{ scale: 1.04 }}
                    className="p-6 bg-white rounded-2xl shadow-lg flex flex-col items-center"
                >
                    <Users className="w-12 h-12 text-indigo-600" />
                    <h3 className="text-xl font-bold mt-4">Contributors</h3>
                    <p className="text-gray-600 text-center mt-2">
                        Meet the amazing people helping improve LearnSpace.
                    </p>
                    <Link 
                        to="/contributors" 
                        className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
                    >
                        View Contributors
                    </Link>
                </motion.div>

                {/* GitHub Repository */}
                <motion.div
                    whileHover={{ scale: 1.04 }}
                    className="p-6 bg-white rounded-2xl shadow-lg flex flex-col items-center"
                >
                    <Github className="w-12 h-12 text-indigo-600" />
                    <h3 className="text-xl font-bold mt-4">GitHub Repository</h3>
                    <p className="text-gray-600 text-center mt-2">
                        Check out our open-source project and contribute.
                    </p>
                    <Link 
                        to="/owner" 
                        className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
                    >
                        Learn More
                    </Link>
                </motion.div>

            </div>

            {/* Footer */}
            <footer className="bg-indigo-600 text-white text-center py-6 text-lg">
                © {new Date().getFullYear()} LearnSpace • Built with passion
            </footer>

        </div>
    );
}
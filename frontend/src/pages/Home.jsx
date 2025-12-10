import { motion } from "framer-motion";
import { Book, Kanban, PenTool, Users, Github, TrendingUp, Lightbulb, Globe, Award } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "../components/LearnSpace logo.png";

function Home() {
    // Sample testimonials data
    const testimonials = [
        {
            id: 1,
            name: "Alex Johnson",
            role: "Computer Science Student",
            content: "LearnSpace transformed how I organize my study materials. The Kanban board keeps me on track with all my assignments.",
            rating: 5
        },
        {
            id: 2,
            name: "Sarah Williams",
            role: "Self-Taught Developer",
            content: "The BookSpace feature helped me discover amazing programming resources I never knew existed. Highly recommended!",
            rating: 5
        },
        {
            id: 3,
            name: "Michael Chen",
            role: "Product Manager",
            content: "As someone juggling multiple projects, the Whiteboard feature is invaluable for brainstorming and planning.",
            rating: 4
        }
    ];

    // Statistics data
    const stats = [
        { value: "10K+", label: "Active Users" },
        { value: "500+", label: "Resources" },
        { value: "50+", label: "Contributors" },
        { value: "4.8", label: "Average Rating" }
    ];

    // Features data
    const features = [
        {
            icon: <Kanban className="w-8 h-8" />,
            title: "Kanban Board",
            description: "Organize your tasks with drag-and-drop simplicity. Visualize your workflow and boost productivity."
        },
        {
            icon: <Book className="w-8 h-8" />,
            title: "BookSpace",
            description: "Access curated learning resources and books categorized by topics and difficulty levels."
        },
        {
            icon: <PenTool className="w-8 h-8" />,
            title: "Whiteboard",
            description: "Brainstorm ideas visually with our collaborative whiteboard tool. Perfect for planning and creativity."
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: "Community",
            description: "Connect with fellow learners and contributors. Share knowledge and grow together."
        },
        {
            icon: <TrendingUp className="w-8 h-8" />,
            title: "Progress Tracking",
            description: "Monitor your learning journey with detailed analytics and achievement badges."
        },
        {
            icon: <Lightbulb className="w-8 h-8" />,
            title: "Smart Recommendations",
            description: "Get personalized learning suggestions based on your interests and progress."
        }
    ];

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
                        <Link
                            to="/kanban"
                            className="inline-block px-10 py-4 bg-white text-indigo-600 rounded-xl shadow-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
                        >
                            Get Started Now
                        </Link>
                    </motion.div>
                </motion.div>
            </div>

            </div>

            {/* Footer */}
            <footer className="bg-indigo-600 text-white text-center py-6 text-lg">
                © {new Date().getFullYear()} LearnSpace • Built with passion
            </footer>

        </div>
    );
}

export default Home;
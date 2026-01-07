import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import {
  Book,
  Kanban,
  PenTool,
  Users,
  Github,
  TrendingUp,
  Lightbulb,
  Globe,
  Award,
  Menu,
  X,
} from "lucide-react";

import Logo from "../components/LearnSpace logo.png";

/* ----------------------------- CONFIG DATA ----------------------------- */

const NAV_ITEMS = [
  { name: "Home", path: "/" },
  { name: "Kanban", path: "/kanban" },
  { name: "BookSpace", path: "/books" },
  { name: "Whiteboard", path: "/whiteboard" },
  { name: "Contributors", path: "/contributors" },
  { name: "About Us", path: "/about-us" }
];

const STATS = [
  { value: "10K+", label: "Active Users" },
  { value: "500+", label: "Resources" },
  { value: "50+", label: "Contributors" },
  { value: "4.8", label: "Average Rating" }
];

const FEATURES = [
  {
    icon: <Kanban className="w-8 h-8" />,
    title: "Kanban Board",
    description:
      "Organize your tasks with drag-and-drop simplicity. Visualize your workflow and boost productivity."
  },
  {
    icon: <Book className="w-8 h-8" />,
    title: "BookSpace",
    description:
      "Access curated learning resources and books categorized by topics and difficulty levels."
  },
  {
    icon: <PenTool className="w-8 h-8" />,
    title: "Whiteboard",
    description:
      "Brainstorm ideas visually with our collaborative whiteboard tool. Perfect for planning and creativity."
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Community",
    description:
      "Connect with fellow learners and contributors. Share knowledge and grow together."
  },
  {
    icon: <TrendingUp className="w-8 h-8" />,
    title: "Progress Tracking",
    description:
      "Monitor your learning journey with detailed analytics and achievement badges."
  },
  {
    icon: <Lightbulb className="w-8 h-8" />,
    title: "Smart Recommendations",
    description:
      "Get personalized learning suggestions based on your interests and progress."
  }
];

/* ----------------------------- COMPONENT ----------------------------- */

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* Navbar */}
      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-indigo-100">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between">

          <div className="flex items-center gap-3">
            <img
              src={Logo}
              alt="LearnSpace logo"
              className="w-10 h-10 object-contain drop-shadow-sm"
            />
            <h1 className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              LearnSpace
            </h1>
          </div>

          {/* Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center gap-8 text-[16px] font-medium">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="relative text-gray-600 hover:text-indigo-600 transition-colors after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-indigo-600 hover:after:w-full after:transition-all"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Button (Desktop) */}
          <div className="hidden md:block">
            <button className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-semibold shadow-md hover:bg-indigo-700 hover:shadow-lg transition-all">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-600 hover:text-indigo-600 focus:outline-none"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-indigo-100 shadow-lg"
          >
            <div className="flex flex-col px-6 py-4 space-y-4">
              {[
                { name: "Home", path: "/" },
                { name: "Kanban", path: "/kanban" },
                { name: "BookSpace", path: "/books" },
                { name: "Whiteboard", path: "/whiteboard" },
                { name: "Contributors", path: "/contributors" },
                { name: "About Us", path: "/about-us" },
              ].map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className="text-gray-600 hover:text-indigo-600 font-medium text-lg transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4">
                <button className="w-full px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold shadow-md hover:bg-indigo-700 hover:shadow-lg transition-all">
                  Get Started
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </nav>

      {/* ----------------------------- HERO ----------------------------- */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644"
            alt="Learning background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 via-indigo-800/80 to-purple-900/90" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-28 md:py-32 text-center text-white">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
            Your Personal Learning <br />
            <span className="text-indigo-300">& Productivity Hub</span>
          </h2>

          <p className="text-base md:text-lg lg:text-xl mt-6 max-w-3xl mx-auto text-indigo-100">
            Manage tasks, discover resources, collaborate with peers, and track your progress — all in one powerful workspace built for modern learners.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4 md:gap-6">
            <motion.div whileHover={{ scale: 1.08 }}>
              <Link
                to="/kanban"
                className="px-6 md:px-8 py-3 md:py-4 bg-white text-indigo-700 rounded-xl shadow-lg text-base md:text-lg font-semibold"
              >
                Get Started
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }}>
              <Link
                to="/contributors"
                className="px-6 md:px-8 py-3 md:py-4 border border-white/60 text-white rounded-xl text-base md:text-lg font-semibold hover:bg-white/10 transition"
              >
                Meet the Community
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ----------------------------- STATS ----------------------------- */}
      <div className="mt-16 md:mt-24 bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 py-14">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {STATS.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ scale: 1.08 }}
                className="relative text-center text-white bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20"
              >
                <div className="text-3xl md:text-4xl lg:text-5xl font-extrabold">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm md:text-lg text-indigo-100 uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ----------------------------- FEATURES ----------------------------- */}
      <div className="mt-20 md:mt-24 px-4 md:px-8">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-800">
              Powerful Features for Modern Learners
            </h2>
            <p className="text-lg text-gray-600 mt-4">
              Everything you need to organize, learn, and grow in one unified platform.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {FEATURES.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg flex flex-col items-center text-center hover:shadow-xl transition-all"
              >
                <div className="bg-indigo-100 p-4 rounded-full text-indigo-600">
                  {feature.icon}
                </div>

                <h3 className="text-xl font-bold mt-6">
                  {feature.title}
                </h3>

                <p className="text-gray-600 mt-3">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Remaining sections (bottom cards, highlights, footer) intentionally kept same in behavior and layout */}

    </div>
  );
}

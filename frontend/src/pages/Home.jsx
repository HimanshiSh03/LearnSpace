import { motion } from "framer-motion";
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
} from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "../components/LearnSpace logo.png";

export default function Home() {
  // Sample testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Computer Science Student",
      content:
        "LearnSpace transformed how I organize my study materials. The Kanban board keeps me on track with all my assignments.",
      rating: 5,
    },
    {
      id: 2,
      name: "Sarah Williams",
      role: "Self-Taught Developer",
      content:
        "The BookSpace feature helped me discover amazing programming resources I never knew existed. Highly recommended!",
      rating: 5,
    },
    {
      id: 3,
      name: "Michael Chen",
      role: "Product Manager",
      content:
        "As someone juggling multiple projects, the Whiteboard feature is invaluable for brainstorming and planning.",
      rating: 4,
    },
  ];

  // Statistics data
  const stats = [
    { value: "10K+", label: "Active Users" },
    { value: "500+", label: "Resources" },
    { value: "50+", label: "Contributors" },
    { value: "4.8", label: "Average Rating" },
  ];

  // Features data
  const features = [
    {
      icon: <Kanban className="w-8 h-8" />,
      title: "Kanban Board",
      description:
        "Organize your tasks with drag-and-drop simplicity. Visualize your workflow and boost productivity.",
    },
    {
      icon: <Book className="w-8 h-8" />,
      title: "BookSpace",
      description:
        "Access curated learning resources and books categorized by topics and difficulty levels.",
    },
    {
      icon: <PenTool className="w-8 h-8" />,
      title: "Whiteboard",
      description:
        "Brainstorm ideas visually with our collaborative whiteboard tool. Perfect for planning and creativity.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community",
      description:
        "Connect with fellow learners and contributors. Share knowledge and grow together.",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Progress Tracking",
      description:
        "Monitor your learning journey with detailed analytics and achievement badges.",
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Smart Recommendations",
      description:
        "Get personalized learning suggestions based on your interests and progress.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* Navbar */}
      <nav className="flex justify-between px-6 md:px-10 py-6 items-center bg-white shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <img
            src={Logo}
            alt="LearnSpace logo"
            className="w-10 h-10 object-contain"
          />
          <h1 className="text-2xl font-bold text-indigo-600">LearnSpace</h1>
        </div>

        <div className="flex gap-8 text-lg">
          <Link to="/">Home</Link>
          <Link to="/kanban">Kanban</Link>
          <Link to="/books">BookSpace</Link>
          <Link to="/whiteboard">Whiteboard</Link>
          <Link to="/contributors">Contributors</Link>
          <Link to="/about-us">About Us</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644"
            alt="Learning background"
            className="w-full h-full object-cover"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 via-indigo-800/80 to-purple-900/90" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-32 text-center text-white">
          <h2 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Your Personal Learning <br />
            <span className="text-indigo-300">& Productivity Hub</span>
          </h2>

          <p className="text-lg md:text-xl mt-6 max-w-3xl mx-auto text-indigo-100">
            Manage tasks, discover resources, collaborate with peers, and track
            your progress — all in one powerful workspace built for modern
            learners.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex justify-center gap-6 flex-wrap">
            <motion.div whileHover={{ scale: 1.08 }}>
              <Link
                to="/kanban"
                className="px-8 py-4 bg-white text-indigo-700 rounded-xl shadow-lg text-lg font-semibold"
              >
                Get Started
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }}>
              <Link
                to="/contributors"
                className="px-8 py-4 border border-white/60 text-white rounded-xl text-lg font-semibold hover:bg-white/10 transition"
              >
                Meet the Community
              </Link>
            </motion.div>
          </div>

          {/* Feature Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
              <h4 className="font-semibold text-lg">📚 Curated Learning</h4>
              <p className="text-indigo-100 mt-2 text-sm">
                High-quality resources tailored to your interests.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
              <h4 className="font-semibold text-lg">✅ Smart Productivity</h4>
              <p className="text-indigo-100 mt-2 text-sm">
                Kanban boards that keep your goals on track.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
              <h4 className="font-semibold text-lg">🤝 Community Powered</h4>
              <p className="text-indigo-100 mt-2 text-sm">
                Learn, share, and grow together with peers.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <div className="mt-16 md:mt-24 bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 py-14">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ scale: 1.08 }}
                className="relative text-center text-white bg-white/10 backdrop-blur-md 
                     rounded-2xl p-6 shadow-lg border border-white/20"
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-white/5 blur-xl opacity-40 -z-10"></div>

                {/* Value */}
                <div className="text-3xl md:text-5xl font-extrabold tracking-wide">
                  {stat.value}
                </div>

                {/* Label */}
                <div className="mt-3 text-sm md:text-lg font-medium text-indigo-100 uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-20 md:mt-24 px-4 md:px-8">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Powerful Features for Modern Learners
            </h2>
            <p className="text-xl text-gray-600 mt-4">
              Everything you need to organize, learn, and grow in one unified
              platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-2xl shadow-lg flex flex-col items-center text-center hover:shadow-xl transition-all"
              >
                <div className="bg-indigo-100 p-4 rounded-full text-indigo-600">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mt-6">{feature.title}</h3>
                <p className="text-gray-600 mt-3">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-20 md:mt-24 px-4 md:px-8 pb-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
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
              <motion.div whileHover={{ scale: 1.05 }} className="mt-4">
                <Link
                  to="/kanban"
                  className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
                >
                  Get Started Now
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Feature Highlights Section */}
      <div className="mt-20 md:mt-24 px-4 md:px-8 pb-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center text-indigo-600 mb-4">
                <Globe className="w-6 h-6 mr-2" />
                <span className="font-semibold">COLLABORATIVE LEARNING</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Learn Together, Grow Faster
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                Connect with peers, share resources, and collaborate on
                projects. Our platform fosters a community-driven approach to
                learning where everyone contributes to collective growth.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-green-100 rounded-full p-2 mt-1">
                    <Award className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="ml-4 text-gray-700">
                    Peer-reviewed study materials
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-100 rounded-full p-2 mt-1">
                    <Award className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="ml-4 text-gray-700">
                    Collaborative project spaces
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-100 rounded-full p-2 mt-1">
                    <Award className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="ml-4 text-gray-700">
                    Knowledge sharing forums
                  </span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl p-8 h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="bg-white rounded-full p-6 inline-block shadow-lg">
                  <Users className="w-16 h-16 text-indigo-600 mx-auto" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mt-6">
                  Community Driven
                </h3>
                <p className="text-gray-600 mt-2">
                  Join 500+ contributors shaping the future of learning
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-6 py-16">
          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={Logo}
                  alt="LearnSpace logo"
                  className="w-10 h-10 object-contain"
                />
                <h2 className="text-2xl font-bold text-white">LearnSpace</h2>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                LearnSpace is your all-in-one learning and productivity
                platform. Organize tasks, explore curated resources, and grow
                with a collaborative community.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link to="/" className="hover:text-indigo-400 transition">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/kanban"
                    className="hover:text-indigo-400 transition"
                  >
                    Kanban Board
                  </Link>
                </li>
                <li>
                  <Link
                    to="/books"
                    className="hover:text-indigo-400 transition"
                  >
                    BookSpace
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contributors"
                    className="hover:text-indigo-400 transition"
                  >
                    Contributors
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <ul className="space-y-3 text-sm">
                <li className="hover:text-indigo-400 transition cursor-pointer">
                  Documentation
                </li>
                <li className="hover:text-indigo-400 transition cursor-pointer">
                  Open Source
                </li>
                <li className="hover:text-indigo-400 transition cursor-pointer">
                  Community Guidelines
                </li>
                <li className="hover:text-indigo-400 transition cursor-pointer">
                  Support
                </li>
              </ul>
            </div>

            {/* Call to Action */}
            <div>
              <h3 className="text-white font-semibold mb-4">
                Join the Community
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                Contribute, collaborate, and grow with learners across the
                world.
              </p>
              <Link
                to="/contributors"
                className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg text-sm font-medium transition"
              >
                Become a Contributor
              </Link>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-700 mt-14 pt-8 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} LearnSpace · Built with passion for
            learners worldwide
          </div>
        </div>
      </footer>
    </div>
  );
}

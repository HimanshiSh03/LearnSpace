import { Link } from "react-router-dom";
import {
  Github,
  Linkedin,
  Mail,
  User,
  Code,
  BookOpen,
  Users,
  Sparkles,
  Menu,
  X,
  Globe,
  Award
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import Logo from "../components/LearnSpace logo.png";

const About = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const teamMembers = [
    {
      name: "Himanshi Sharma",
      role: "Developer & Owner",
      bio: "Skilled developer contributing to the LearnSpace platform, enhancing features and improving user experience.",
      skills: ["React", "JavaScript", "NodeJS", "MongoDB"],
      github: "https://github.com/HimanshiSh03",
      linkedin: "https://www.linkedin.com/in/himanshi-sharma1009/",
      email: "mailto:himanshi03dev@gmail.com",
    },
  ];

  const features = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "Open Source",
      desc: "Built openly with transparency and community collaboration.",
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Learning Focused",
      desc: "Designed to improve consistency and productivity in learning.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Community Driven",
      desc: "Powered by contributors passionate about education.",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-indigo-100">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
          {/* Logo */}
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

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center relative overflow-hidden">
         {/* Background Elements */}
         <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
            <div className="absolute top-10 left-10 w-64 h-64 bg-indigo-200/20 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl" />
         </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-indigo-100/80 backdrop-blur-sm text-indigo-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-6 shadow-sm border border-indigo-200">
            <Sparkles className="w-4 h-4" />
            Open-Source Learning Platform
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">LearnSpace</span>
          </h1>

          <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-600 leading-relaxed">
            LearnSpace is a community-driven platform designed to help learners
            organize, track, and grow their skills through structured learning and
            meaningful collaboration.
          </p>

          <motion.div 
            className="flex flex-wrap justify-center gap-4 mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Link
              to="/"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-xl font-semibold shadow-lg hover:shadow-indigo-500/30 transition-all transform hover:-translate-y-1"
            >
              Back to Home
            </Link>
            <Link
              to="/contributors"
              className="bg-white border border-indigo-100 text-indigo-600 hover:bg-indigo-50 px-8 py-3.5 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1"
            >
              Contributors
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 py-12">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((item, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-2xl shadow-xl p-8 hover:shadow-2xl hover:border-indigo-200 transition-all"
            >
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/20">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="container mx-auto px-6 py-16">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 p-8 md:p-12 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -z-10 opacity-50 pointer-events-none" />
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <Users className="w-8 h-8 text-indigo-600" />
              Meet the Team
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="
                  group relative
                  border border-gray-100 rounded-2xl p-8
                  bg-gradient-to-b from-white to-gray-50/50
                  transition-all duration-300
                  hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/10
                  hover:border-indigo-200
                "
              >
                {/* Header */}
                <div className="flex items-center gap-5 mb-6">
                  <div
                    className="
                      relative flex items-center justify-center
                      w-16 h-16 rounded-full
                      bg-indigo-100 text-indigo-600
                      ring-4 ring-indigo-50
                      group-hover:ring-indigo-100 group-hover:bg-indigo-600 group-hover:text-white
                      transition-all duration-300
                    "
                  >
                    <User className="w-8 h-8" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-indigo-700 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-indigo-600 font-medium">
                      {member.role}
                    </p>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-gray-600 leading-relaxed mb-6">
                  {member.bio}
                </p>

                {/* Skills */}
                <div className="mb-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                    Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="
                          px-3 py-1 text-xs font-semibold
                          rounded-full
                          bg-indigo-50 text-indigo-700 border border-indigo-100
                          hover:bg-indigo-100 hover:scale-105
                          transition-all duration-200 cursor-default
                        "
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex items-center gap-5 pt-6 border-t border-gray-100">
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gray-900 transition-colors transform hover:scale-110"
                  >
                    <Github className="w-6 h-6" />
                  </a>

                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-600 transition-colors transform hover:scale-110"
                  >
                    <Linkedin className="w-6 h-6" />
                  </a>

                  <a
                    href={member.email}
                    className="text-gray-400 hover:text-red-500 transition-colors transform hover:scale-110"
                  >
                    <Mail className="w-6 h-6" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center md:justify-start gap-4 mt-12 pt-8 border-t border-gray-100"
          >
            <a
              href="https://github.com/HimanshiSh03/LearnSpace"
              target="_blank"
              rel="noopener noreferrer"
              className="
                group inline-flex items-center gap-3
                bg-gray-900 hover:bg-black
                text-white font-semibold
                py-3 px-6 rounded-xl
                transition-all duration-300
                shadow-xl hover:shadow-2xl hover:shadow-gray-900/30
                transform hover:-translate-y-1
              "
            >
              <Github className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span>View on GitHub</span>
            </a>

            <Link
              to="/contributors"
              className="
                inline-flex items-center gap-3
                bg-indigo-600 hover:bg-indigo-700
                text-white font-semibold
                py-3 px-6 rounded-xl
                transition-all duration-300
                shadow-xl hover:shadow-2xl hover:shadow-indigo-500/30
                transform hover:-translate-y-1
              "
            >
              <Users className="w-5 h-5" />
              <span>See Contributors</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
           <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        </div>
        <div className="relative z-10 container mx-auto px-6">
            <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.5 }}
            >
                <h2 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-tight">
                Want to Contribute to LearnSpace?
                </h2>
                <p className="max-w-xl mx-auto text-indigo-100 text-lg mb-8 leading-relaxed">
                Join our open-source community and help build tools that empower
                learners worldwide.
                </p>
                <a
                href="https://github.com/HimanshiSh03/LearnSpace"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white text-indigo-600 px-8 py-3.5 rounded-xl font-bold shadow-lg hover:bg-indigo-50 hover:shadow-xl transition-all transform hover:-translate-y-1"
                >
                Star on GitHub
                </a>
            </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
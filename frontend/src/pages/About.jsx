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
} from "lucide-react";
import Logo from "../components/LearnSpace logo.png";

const About = () => {
  const teamMembers = [
    {
      name: "Himanshi Sharma",
      role: "Founder & Developer",
      bio: "Building LearnSpace with a focus on clean UX, scalability, and open-source collaboration.",
      skills: ["React", "Node.js", "MongoDB", "Tailwind"],
      github: "https://github.com/HimanshiSh03",
      linkedin: "https://www.linkedin.com/in/himanshi-sharma1009/",
      email: "mailto:himanshi03dev@gmail.com",
    },
  ];

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

          {/* Navigation Links */}
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

          {/* CTA Button */}
          <div className="hidden md:block">
            <button className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-semibold shadow-md hover:bg-indigo-700 hover:shadow-lg transition-all">
              Get Started
            </button>
          </div>
        </div>
      </nav>
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full text-sm mb-6">
          <Sparkles className="w-4 h-4" />
          Open-Source Learning Platform
        </div>

        <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
          About <span className="text-indigo-600">LearnSpace</span>
        </h1>

        <p className="max-w-3xl mx-auto text-lg text-gray-600 leading-relaxed">
          LearnSpace is a community-driven platform designed to help learners
          organize, track, and grow their skills through structured learning and
          meaningful collaboration.
        </p>

        <div className="flex justify-center gap-4 mt-8">
          <Link
            to="/"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition"
          >
            Back to Home
          </Link>
          <Link
            to="/contributors"
            className="border border-indigo-200 text-indigo-600 hover:bg-indigo-50 px-6 py-3 rounded-xl font-medium transition"
          >
            Contributors
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            icon: <Code />,
            title: "Open Source",
            desc: "Built openly with transparency and community collaboration.",
          },
          {
            icon: <BookOpen />,
            title: "Learning Focused",
            desc: "Designed to improve consistency and productivity in learning.",
          },
          {
            icon: <Users />,
            title: "Community Driven",
            desc: "Powered by contributors passionate about education.",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-lg p-8 hover:-translate-y-1 transition"
          >
            <div className="bg-indigo-100 text-indigo-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
              {item.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* Team Section */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          Meet the Creator
        </h2>

        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-10 flex flex-col md:flex-row gap-10 items-center">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white w-32 h-32 rounded-full flex items-center justify-center">
            <User className="w-16 h-16" />
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold">{teamMembers[0].name}</h3>
            <p className="text-indigo-600 font-medium mb-3">
              {teamMembers[0].role}
            </p>
            <p className="text-gray-600 mb-4">{teamMembers[0].bio}</p>

            <div className="flex flex-wrap gap-2 mb-5 justify-center md:justify-start">
              {teamMembers[0].skills.map((skill, i) => (
                <span
                  key={i}
                  className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>

          <div className="flex flex-wrap gap-4 mt-6">
            <a
              href="https://github.com/HimanshiSh03/LearnSpace"
              target="_blank"
              rel="noopener noreferrer"
              className="
      group inline-flex items-center gap-2
      bg-gradient-to-r from-gray-800 to-gray-900
      hover:from-gray-900 hover:to-black
      text-white font-semibold
      py-3 px-7 rounded-xl
      transition-all duration-300 ease-out
      shadow-lg hover:shadow-2xl hover:shadow-gray-900/50
      transform hover:-translate-y-1 hover:scale-105
      focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2
    "
            >
              <Github
                className="
        w-5 h-5 transition-transform duration-300
        group-hover:rotate-12 group-hover:scale-110
      "
              />
              <span className="tracking-wide">View on GitHub</span>
            </a>

            <Link
              to="/contributors"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200 flex items-center"
            >
              <Users className="mr-2" />
              See Contributors
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-indigo-600 text-white py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Want to Contribute to LearnSpace?
        </h2>
        <p className="max-w-xl mx-auto text-indigo-100 mb-6">
          Join the open-source community and help build tools that empower
          learners worldwide.
        </p>
        <a
          href="#"
          className="bg-white text-indigo-600 px-8 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition"
        >
          View on GitHub
        </a>
      </section>
    </div>
  );
};

export default About;

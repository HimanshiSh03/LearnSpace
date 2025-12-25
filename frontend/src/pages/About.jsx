import { Link } from "react-router-dom";
import {
  Github,
  Linkedin,
  Mail,
  User,
  Code,
  BookOpen,
  Users,
} from "lucide-react";

const About = () => {
  const teamMembers = [
    {
      name: "Himanshi Sharma",
      role: "Developer & Owner",
      bio: "Skilled developer contributing to the LearnSpace platform, enhancing features and improving user experience.",
      skills: ["React", "JavaScript", "NodeJS", "MongoDB"],
      github: "#HimanshiSh03",
      linkedin: "#https://www.linkedin.com/in/himanshi-sharma1009/",
      email: "#himanshi03dev@gmail.com",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center md:text-left">
            About LearnSpace
          </h1>
          <Link
            to="/"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 text-center"
          >
            Back to Home
          </Link>
        </div>

        {/* Project Info */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            <div className="flex-shrink-0">
              <div className="bg-indigo-100 rounded-full p-4 w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
                <User className="text-indigo-600 w-12 h-12 md:w-16 md:h-16" />
              </div>
            </div>

            <div className="text-center md:text-left">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                LearnSpace Project
              </h2>
              <p className="text-gray-600 mb-4 text-sm md:text-base">
                LearnSpace is an open-source educational platform designed to
                help students and professionals organize their learning journey.
                It combines productivity tools with educational resources to
                create a comprehensive learning environment.
              </p>

              <div className="flex flex-wrap gap-2 md:gap-4 justify-center md:justify-start mt-4 md:mt-6">
                <div className="flex items-center bg-indigo-50 px-3 py-1 md:px-4 md:py-2 rounded-lg">
                  <Code className="text-indigo-600 mr-1 md:mr-2 w-4 h-4 md:w-5 md:h-5" />
                  <span className="text-indigo-700 font-medium text-xs md:text-sm">
                    Open Source
                  </span>
                </div>
                <div className="flex items-center bg-green-50 px-3 py-1 md:px-4 md:py-2 rounded-lg">
                  <BookOpen className="text-green-600 mr-1 md:mr-2 w-4 h-4 md:w-5 md:h-5" />
                  <span className="text-green-700 font-medium text-xs md:text-sm">
                    Educational
                  </span>
                </div>
                <div className="flex items-center bg-purple-50 px-3 py-1 md:px-4 md:py-2 rounded-lg">
                  <Users className="text-purple-600 mr-1 md:mr-2 w-4 h-4 md:w-5 md:h-5" />
                  <span className="text-purple-700 font-medium text-xs md:text-sm">
                    Community Driven
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 text-center md:text-left">
            Meet the Team
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 md:p-6 hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-indigo-100 rounded-full p-2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center mr-3 md:mr-4">
                    <User className="text-indigo-600 w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-800">
                      {member.name}
                    </h3>
                    <p className="text-indigo-600 text-sm md:text-base">{member.role}</p>
                  </div>
                </div>

                <p className="text-gray-600 text-sm md:text-base mb-4">{member.bio}</p>

                <div className="mb-4">
                  <h4 className="font-bold text-gray-700 mb-2 text-sm md:text-base">Skills:</h4>
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="bg-gray-100 text-gray-700 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 mt-auto">
                  <a
                    href={member.github}
                    className="text-gray-500 hover:text-indigo-600"
                  >
                    <Github className="w-4 h-4 md:w-5 md:h-5" />
                  </a>
                  <a
                    href={member.linkedin}
                    className="text-gray-500 hover:text-indigo-600"
                  >
                    <Linkedin className="w-4 h-4 md:w-5 md:h-5" />
                  </a>
                  <a
                    href={member.email}
                    className="text-gray-500 hover:text-indigo-600"
                  >
                    <Mail className="w-4 h-4 md:w-5 md:h-5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vision & Contribute */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
            Project Vision
          </h2>
          <p className="text-gray-600 text-sm md:text-base mb-4">
            Our vision is to create a platform that makes learning more
            accessible, organized, and collaborative. We believe that everyone
            deserves quality educational tools regardless of their background or
            resources.
          </p>

          <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3">
            Contribute to LearnSpace
          </h3>
          <p className="text-gray-600 text-sm md:text-base mb-4">
            LearnSpace is an open-source project, and we welcome contributions
            from developers, designers, educators, and anyone passionate about
            education. Check out our GitHub repository to get started!
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-4 md:mt-6">
            <a
              href="#"
              className="bg-gray-800 hover:bg-gray-900 text-white font-medium py-2 px-6 rounded-lg transition duration-200 flex items-center justify-center"
            >
              <Github className="mr-2" />
              View on GitHub
            </a>
            <Link
              to="/contributors"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200 flex items-center justify-center"
            >
              <Users className="mr-2" />
              See Contributors
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
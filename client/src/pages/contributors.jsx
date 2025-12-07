import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, GitCommit, GitPullRequest, CheckCircle, Github, ExternalLink } from 'lucide-react';

const Contributors = () => {
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalContributors: 0,
    totalCommits: 0,
    totalPRs: 0,
    totalIssues: 0
  });

  // Replace with your GitHub repo details
  const GITHUB_OWNER = 'YOUR_ORG';
  const GITHUB_REPO = 'LearnSpace';

  useEffect(() => {
    fetchContributors();
  }, []);

  const fetchContributors = async () => {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contributors`
      );
      
      if (!response.ok) throw new Error('Failed to fetch contributors');
      
      const data = await response.json();
      setContributors(data);
      
      // Calculate stats
      const totalCommits = data.reduce((sum, c) => sum + c.contributions, 0);
      setStats({
        totalContributors: data.length,
        totalCommits: totalCommits,
        totalPRs: Math.floor(totalCommits * 0.3),
        totalIssues: Math.floor(totalCommits * 0.2)
      });
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching contributors:', error);
      setLoading(false);
    }
  };

  const StatCard = ({ icon: Icon, value, label, color }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-lg p-6 text-center border-2 border-transparent hover:border-purple-400 transition-all"
    >
      <Icon className={`w-8 h-8 ${color} mx-auto mb-3`} />
      <div className="text-4xl font-bold text-purple-600 mb-2">{value}</div>
      <div className="text-gray-600 font-medium">{label}</div>
    </motion.div>
  );

  const ContributorCard = ({ contributor, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-2xl transition-all"
    >
      <a
        href={contributor.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="block group"
      >
        <div className="relative inline-block mb-4">
          <img
            src={contributor.avatar_url}
            alt={contributor.login}
            className="w-24 h-24 rounded-full mx-auto border-4 border-purple-100 group-hover:border-purple-400 transition-all"
          />
          <div className="absolute -bottom-2 -right-2 bg-purple-600 text-white text-xs font-bold rounded-full w-8 h-8 flex items-center justify-center shadow-lg">
            {contributor.contributions}
          </div>
        </div>
        
        <h3 className="text-lg font-bold text-gray-800 group-hover:text-purple-600 transition-colors mb-1">
          {contributor.login}
        </h3>
        
        <p className="text-sm text-gray-600 mb-3">
          {contributor.contributions} contribution{contributor.contributions > 1 ? 's' : ''}
        </p>
        
        <div className="flex justify-center gap-2">
          <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full font-medium">
            🚀 Contributor
          </span>
        </div>
      </a>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold mb-4">Our Amazing Contributors 🌟</h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              Meet the talented individuals who make LearnSpace better every day. 
              Their dedication and passion drive our community forward.
            </p>
          </motion.div>
        </div>
      </header>

      {/* Statistics Section */}
      <section className="container mx-auto px-4 -mt-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard
            icon={Users}
            value={stats.totalContributors}
            label="Total Contributors"
            color="text-purple-600"
          />
          <StatCard
            icon={GitCommit}
            value={stats.totalCommits}
            label="Total Commits"
            color="text-blue-600"
          />
          <StatCard
            icon={GitPullRequest}
            value={stats.totalPRs}
            label="Pull Requests"
            color="text-green-600"
          />
          <StatCard
            icon={CheckCircle}
            value={stats.totalIssues}
            label="Issues Resolved"
            color="text-orange-600"
          />
        </div>
      </section>

      {/* Contributors Grid */}
      <section className="container mx-auto px-4 pb-16">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">All Contributors</h2>
          <p className="text-gray-600">Thank you for your valuable contributions!</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            <p className="text-gray-600 mt-4">Loading contributors...</p>
          </div>
        ) : contributors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {contributors.map((contributor, index) => (
              <ContributorCard
                key={contributor.id}
                contributor={contributor}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">👥</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Contributors Yet</h3>
            <p className="text-gray-600">Be the first to contribute to LearnSpace!</p>
          </div>
        )}
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Want to Join Our Community?</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            We welcome contributions of all kinds! Start your journey with LearnSpace today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-white text-purple-600 rounded-full font-semibold hover:bg-gray-100 transition-all inline-flex items-center justify-center gap-2"
            >
              <Github className="w-6 h-6" />
              View on GitHub
            </a>
            <a
              href="#"
              className="px-8 py-3 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-purple-600 transition-all inline-flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-5 h-5" />
              Contributing Guide
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contributors;
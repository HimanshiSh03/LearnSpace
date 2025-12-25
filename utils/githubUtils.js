const fetch = require('node-fetch');

/**
 * Fetch contributors from GitHub API
 * @param {string} repoOwner - Repository owner (e.g., 'HimanshiSh03')
 * @param {string} repoName - Repository name (e.g., 'LearnSpace')
 * @returns {Promise<Array>} Array of contributor objects
 */
const fetchGithubContributors = async (repoOwner, repoName) => {
  try {
    const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contributors`);
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }
    
    const contributors = await response.json();
    return contributors;
  } catch (error) {
    console.error('Error fetching GitHub contributors:', error);
    // Return empty array as fallback
    return [];
  }
};

/**
 * Format GitHub contributors to match our contributor model
 * @param {Array} githubContributors - Raw GitHub contributor data
 * @returns {Array} Formatted contributor objects
 */
const formatGithubContributors = (githubContributors) => {
  return githubContributors.map((contributor, index) => ({
    id: contributor.id,
    login: contributor.login,
    avatar_url: contributor.avatar_url,
    html_url: contributor.html_url,
    contributions: contributor.contributions,
    isGithubContributor: true,
    // Assign points based on contributions (more contributions = more points)
    points: Math.max(1, Math.floor(contributor.contributions * 2)),
    // Distribute contributions across task levels
    level1Tasks: contributor.contributions,
    level2Tasks: Math.floor(contributor.contributions / 2),
    level3Tasks: Math.floor(contributor.contributions / 5),
    // Add a timestamp for sorting
    githubJoined: new Date().toISOString()
  }));
};

module.exports = {
  fetchGithubContributors,
  formatGithubContributors
};
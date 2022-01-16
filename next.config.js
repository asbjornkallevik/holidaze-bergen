const withVideos = require("next-videos");

module.exports = withVideos({
  reactStrictMode: true,
  images: {
    domains: [process.env.HOST_NAME],
  },
});

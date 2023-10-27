const path = require("path")

module.exports = {
  reactStrictMode: true,
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@components": path.join(__dirname, "components"),
      "@utils": path.join(__dirname, "utils"),
      "@hooks": path.join(__dirname, "hooks"),
      "@styles": path.join(__dirname, "styles"),
    }

    return config
  },

  async rewrites() {
    return [
      {
        source: "/@:username",
        destination: "/:username",
      },
    ]
  },
}

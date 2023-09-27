const path = require("path")

module.exports = {
  reactStrictMode: true,
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@components": path.join(__dirname, "components"),
      "@utils": path.join(__dirname, "utils"),
      "@hooks": path.join(__dirname, "hooks"),
    }

    return config
  },
}

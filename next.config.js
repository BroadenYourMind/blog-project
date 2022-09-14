/** @type {import('next').NextConfig} */
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

const nextConfigDevelopment = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    mongodb_username: "Ivan",
    mongodb_password: "YrNj4v0tlZ2qOtDI",
    mongodb_clustername: "cluster0",
    mongodb_database: "my-site-dev",
  },
};

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return nextConfigDevelopment;
  }

  return {
    reactStrictMode: true,
    swcMinify: true,
    env: {
      mongodb_username: "Ivan",
      mongodb_password: "YrNj4v0tlZ2qOtDI",
      mongodb_clustername: "cluster0",
      mongodb_database: "my-site",
    },
  };
};

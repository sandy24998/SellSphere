module.exports = {
  apps: [
    {
      name: "backend",
      script: "./server.js",
      cwd: "./back-end",
      env: {
        NODE_ENV: "development",
        PORT: 5000,
        MONGO_URI: process.env.MONGO_URI
      },
    },
    {
      name: "frontend",
      script: "npx",
      args: "serve -s build -l 3000",
      cwd: "./front-end",
      env: {
        NODE_ENV: "development",
      },
    },
  ],
};

module.exports = {
  apps: [
    {
      name: "backend",
      script: "./server.js",       // backend entry file
      cwd: "./back-end",           // backend working directory
      instances: 1,
      autorestart: true,
      watch: false,
      max_restarts: 10,
      env: {
        NODE_ENV: "development",
        PORT: 5000,
        MONGO_URI: process.env.MONGO_URI
      }
    },
    {
      name: "frontend",
      script: "npx",
      args: "serve -s build -l 3000",
      cwd: "./front-end",
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: "development"
      }
    }
  ]
};

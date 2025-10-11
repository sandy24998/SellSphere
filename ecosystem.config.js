module.exports = {
  apps: [
    {
      name: "mern-backend",
      script: "./back-end/server.js",
      env: {
        NODE_ENV: "development",
        PORT: 5000,
        MONGO_URI: "mongodb+srv://sandy54998:SNeCsU3iduibF0wb@cluster0.ypmdedl.mongodb.net/SellAndBuy?retryWrites=true&w=majority"
      },
      watch: true,
      ignore_watch: ["node_modules", "logs"],
      error_file: "./logs/backend-err.log",
      out_file: "./logs/backend-out.log"
    },
    {
      name: "mern-frontend",
      script: "npm",
      args: "start",
      cwd: "./front-end",
      env: {
        NODE_ENV: "development",
        PORT: 3000,
        REACT_APP_API_URL: "http://localhost:5000/api"
      },
      watch: true,
      ignore_watch: ["node_modules", "build", "logs"],
      error_file: "./logs/frontend-err.log",
      out_file: "./logs/frontend-out.log"
    }
  ]
};
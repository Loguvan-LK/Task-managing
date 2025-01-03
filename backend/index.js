const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { sequelize } = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const reportRoutes = require("./routes/reportRoutes");
const userRoutes = require("./routes/userRoutes");
const logger = require("./utils/logger");
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true,
  })
);

app.use(express.json());
app.use(logger);
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);
app.use("/report", reportRoutes);
app.use("/users", userRoutes);

sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Database synced");
  })
  .catch((err) => {
    console.error("Database sync failed:", err);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

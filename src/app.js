
require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const logger = require("./middlewares/logger");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const tasksRouter = require("./routes/tasks.routes");

const app = express();


app.use(helmet());
app.disable("x-powered-by"); 


const limiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 60_000, 
  max: Number(process.env.RATE_LIMIT_MAX) || 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: "error",
    message: "Demasiadas solicitudes, por favor intenta más tarde.",
  },
});
app.use(limiter);


app.use(express.json());
app.use(logger);


app.use("/api/tasks", tasksRouter);

app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`   Entorno: ${process.env.NODE_ENV || "development"}`);
});

module.exports = app;

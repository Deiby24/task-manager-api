
function notFound(req, res) {
  res.status(404).json({
    status: "error",
    message: `La ruta '${req.originalUrl}' no existe`,
  });
}

function errorHandler(err, _req, res, _next) {
  const isDev = process.env.NODE_ENV === "development";
  const status = err.status || 500;

  console.error(`[ERROR] ${err.message}`);

  res.status(status).json({
    status: "error",
    message: status === 500 ? "Error interno del servidor" : err.message,
    ...(isDev && status === 500 && { detail: err.message }),
  });
}

module.exports = { notFound, errorHandler };

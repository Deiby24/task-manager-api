
const store = require("../data/store");

function listTasks(req, res) {
  const { status, page = 1, limit = 10 } = req.query;

  let tasks = store.getAll();

  if (status) {
    tasks = tasks.filter((t) => t.status === status);
  }

  const total = tasks.length;
  const pageNum = Number(page);
  const limitNum = Number(limit);
  const start = (pageNum - 1) * limitNum;
  const paginated = tasks.slice(start, start + limitNum);

  res.json({
    status: "success",
    data: paginated,
    meta: {
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum),
    },
  });
}

function getTask(req, res) {
  const id = Number(req.params.id);
  const task = store.getById(id);

  if (!task) {
    return res.status(404).json({
      status: "error",
      message: `No se encontró la tarea con id ${id}`,
    });
  }

  res.json({ status: "success", data: task });
}

function createTask(req, res) {
  const task = store.create(req.body);
  res.status(201).json({ status: "success", data: task });
}

function updateStatus(req, res) {
  const id = Number(req.params.id);
  const { status } = req.body;

  const task = store.updateStatus(id, status);

  if (!task) {
    return res.status(404).json({
      status: "error",
      message: `No se encontró la tarea con id ${id}`,
    });
  }

  res.json({ status: "success", data: task });
}

function deleteTask(req, res) {
  const id = Number(req.params.id);
  const deleted = store.delete(id);

  if (!deleted) {
    return res.status(404).json({
      status: "error",
      message: `No se encontró la tarea con id ${id}`,
    });
  }

  res.status(204).send();
}

module.exports = { listTasks, getTask, createTask, updateStatus, deleteTask };



let tasks = [];
let nextId = 1;

const store = {
  getAll() {
    return [...tasks];
  },

  getById(id) {
    return tasks.find((t) => t.id === id) || null;
  },

  create(taskData) {
    const task = {
      id: nextId++,
      title: taskData.title,
      description: taskData.description ?? null,
      status: taskData.status ?? "pending",
      createdAt: new Date().toISOString(),
    };
    tasks.push(task);
    return task;
  },

  updateStatus(id, status) {
    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) return null;
    tasks[index] = { ...tasks[index], status };
    return tasks[index];
  },

  delete(id) {
    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) return false;
    tasks.splice(index, 1);
    return true;
  },
};

module.exports = store;

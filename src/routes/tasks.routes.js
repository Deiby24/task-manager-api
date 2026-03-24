
const { Router } = require("express");
const ctrl = require("../controllers/tasks.controller");
const { validate, createTaskSchema, updateStatusSchema, statusQuerySchema } = require("../middlewares/validate");

const router = Router();

router.get("/",    validate(statusQuerySchema, "query"), ctrl.listTasks);
router.get("/:id", ctrl.getTask);
router.post("/",   validate(createTaskSchema), ctrl.createTask);
router.patch("/:id/status", validate(updateStatusSchema), ctrl.updateStatus);
router.delete("/:id", ctrl.deleteTask);

module.exports = router;

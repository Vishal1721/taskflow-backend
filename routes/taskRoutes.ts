import express from "express";
import authMiddleware from "../middleware/authMiddleware";
import {
  createTaskController,
  getProjectTasksController,
  getSingleTaskController,
  updateTaskController,
  deleteTaskController,
  assignTaskController,
  getMyTasksController,
} from "../controllers/taskController";

const router = express.Router();

// tasks inside a project
router.post("/projects/:projectId/tasks", authMiddleware, createTaskController);

router.get(
  "/projects/:projectId/tasks",
  authMiddleware,
  getProjectTasksController,
);

// single task actions
router.get("/tasks/:taskId", authMiddleware, getSingleTaskController);
router.patch("/tasks/:taskId", authMiddleware, updateTaskController);
router.delete("/tasks/:taskId", authMiddleware, deleteTaskController);

// assign task
router.patch("/tasks/:taskId/assign", authMiddleware, assignTaskController);

// my tasks
router.get("/tasks/my", authMiddleware, getMyTasksController);

export default router;

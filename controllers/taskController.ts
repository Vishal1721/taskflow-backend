import { Request, Response } from "express";
import {
  createTaskService,
  getProjectTasksService,
  getTaskByIdService,
  updateTaskService,
  deleteTaskService,
  assignTaskService,
  getMyTasksService,
} from "../services/taskServices";

// CREATE TASK
const createTaskController = async (req: Request, res: Response) => {
  try {
    const { title, description, priority, dueDate } = req.body;
    const { projectId } = req.params;
    const userId = req.user?.id;

    if (!title || !projectId || !userId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const task = await createTaskService({
      title,
      description,
      priority,
      dueDate,
      projectId,
      createdBy: userId,
    });

    return res.status(201).json({ message: "Task created", task });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

// GET PROJECT TASKS 
const getProjectTasksController = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;
    if (!projectId) {
      return res.status(400).json({ message: "Project ID missing" });
    }

    const tasks = await getProjectTasksService(projectId);
    return res.status(200).json({ tasks });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

// GET SINGLE TASK
const getSingleTaskController = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    if (!taskId) {
      return res.status(400).json({ message: "Task ID missing" });
    }

    const task = await getTaskByIdService(taskId);
    return res.status(200).json({ task });
  } catch (err: any) {
    return res.status(404).json({ message: err.message });
  }
};

// UPDATE TASK
const updateTaskController = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const userId = req.user?.id;

    if (!taskId || !userId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const task = await updateTaskService(taskId, userId, req.body);
    return res.status(200).json({ task });
  } catch (err: any) {
    return res.status(403).json({ message: err.message });
  }
};

// DELETE TASK 
const deleteTaskController = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const userId = req.user?.id;

    if (!taskId || !userId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    await deleteTaskService(taskId, userId);
    return res.status(200).json({ message: "Task deleted" });
  } catch (err: any) {
    return res.status(403).json({ message: err.message });
  }
};

// ASSIGN TASK 
const assignTaskController = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const { assigneeId } = req.body;
    const userId = req.user?.id;

    if (!taskId || !assigneeId || !userId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const task = await assignTaskService(taskId, userId, assigneeId);
    return res.status(200).json({ task });
  } catch (err: any) {
    return res.status(403).json({ message: err.message });
  }
};

// GET MY TASKS 
const getMyTasksController = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const tasks = await getMyTasksService(userId);
    return res.status(200).json({ tasks });
  } catch (err: any) {
    return res.status(404).json({ message: err.message });
  }
};

export {
  createTaskController,
  getProjectTasksController,
  getSingleTaskController,
  updateTaskController,
  deleteTaskController,
  assignTaskController,
  getMyTasksController,
};

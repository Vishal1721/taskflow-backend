import TaskModel from "../models/taskModels";
import Project from "../models/projectModels";
import projectMembershipCheck from "../utils/findDb";
import mongoose from "mongoose";
import { TaskDocument } from "../models/taskModels";

type TaskData = {
  title: string;
  description?: string;
  priority?: string;
  dueDate?: Date;
  projectId: string;
  createdBy: string;
};

const createTaskService = async (data: TaskData) => {
  const isMember = await projectMembershipCheck(data.projectId, data.createdBy);
  if (!isMember) throw new Error("Not authorized");

  return await TaskModel.create(data);
};

const getProjectTasksService = async (projectId: string) => {
  return await TaskModel.find({ projectId });
};

const getTaskByIdService = async (taskId: string) => {
  const task = await TaskModel.findById(taskId);
  if (!task) throw new Error("Task not found");
  return task;
};

const updateTaskService = async (
  taskId: string,
  userId: string,
  updates: Partial<TaskDocument>,
) => {
  const task = await TaskModel.findById(taskId);
  if (!task) throw new Error("Task not found");

  const isMember = await projectMembershipCheck(
    task.projectId.toString(),
    userId,
  );
  if (!isMember) throw new Error("Unauthorized");

  Object.assign(task, updates);
  await task.save();
  return task;
};

const deleteTaskService = async (taskId: string, userId: string) => {
  const task = await TaskModel.findById(taskId);
  if (!task) throw new Error("Task not found");

  const isMember = await projectMembershipCheck(
    task.projectId.toString(),
    userId,
  );
  if (!isMember) throw new Error("Unauthorized");

  await task.deleteOne();
};

const assignTaskService = async (
  taskId: string,
  userId: string,
  assigneeId: string,
) => {
  const task = await TaskModel.findById(taskId);
  if (!task) throw new Error("Task not found");

  const project = await Project.findById(task.projectId);
  if (!project) throw new Error("Project not found");

  if (project.owner.toString() !== userId) {
    throw new Error("Only owner can assign tasks");
  }

  const isMember = await projectMembershipCheck(
    project._id.toString(),
    assigneeId,
  );
  if (!isMember) throw new Error("Assignee not a member");

  task.assignee = new mongoose.Types.ObjectId(assigneeId);
  await task.save();
  return task;
};

const getMyTasksService = async (userId: string) => {
  const tasks = await TaskModel.find({ assignee: userId });
  if (!tasks.length) throw new Error("No tasks assigned");
  return tasks;
};

export {
  createTaskService,
  getProjectTasksService,
  getTaskByIdService,
  updateTaskService,
  deleteTaskService,
  assignTaskService,
  getMyTasksService,
};

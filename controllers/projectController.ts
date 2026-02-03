import { Request, Response } from "express";
import {
  getProjectByIdService,
  createProjectService,
  findProjectsByMember,
} from "../services/projectServices";

type ProjectBody = {
  projectTitle: string;
  description: string;
};

// CREATE PROJECT
const createProject = async (
  req: Request<{}, {}, ProjectBody>,
  res: Response,
) => {
  try {
    const { projectTitle, description } = req.body;
    const userId = req.user?.id;

    if (!projectTitle || !userId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const projectStored = await createProjectService({
      name: projectTitle,
      description,
      owner: userId,
      members: [userId],
    });

    return res.status(201).json({
      message: "Project created successfully",
      project: projectStored,
    });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

// GET MY PROJECTS
const getMyProjects = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const projects = await findProjectsByMember(userId);

    return res.status(200).json({
      message: "Projects fetched successfully",
      projects,
    });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

// GET PROJECT DETAILS
const getProjectById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const projectId = req.params.id;

    const project = await getProjectByIdService(projectId);

    return res.status(200).json({
      message: "Project details fetched successfully",
      project,
    });
  } catch (err: any) {
    return res.status(404).json({ message: err.message });
  }
};

export { createProject, getMyProjects, getProjectById };

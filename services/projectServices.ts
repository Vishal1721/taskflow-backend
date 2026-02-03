import Project from "../models/projectModels";
import mongoose from "mongoose";
import { ProjectDocument } from "../models/projectModels";
type ProjectData = {
  name: string;
  description?: string;
  owner: string;
  members?: string[];
};

const createProjectService = async (
  data: ProjectData,
): Promise<ProjectDocument> => {
  const projectData: any = {
    name: data.name,
    ...(data.description && { description: data.description }),
    owner: new mongoose.Types.ObjectId(data.owner),
  };
  if (data.members) {
    projectData.members = data.members.map(
      (id) => new mongoose.Types.ObjectId(id),
    );
  }
  const project = await Project.create(projectData);

  return project as unknown as ProjectDocument;
};

const findProjectsByMember = async (userId: string): Promise<any[]> => {
  return await Project.find({
    members: new mongoose.Types.ObjectId(userId),
  });
};

const getProjectByIdService = async (projectId: string): Promise<any> => {
  const project = await Project.findById(projectId);
  if (!project) {
    throw new Error("Project not found");
  }
  return project;
};

export { createProjectService, findProjectsByMember, getProjectByIdService };

import mongoose from "mongoose";
import Project from "../models/projectModels";

const projectMembershipCheck = async (projectId: string, userId: string) => {
  const project = await Project.findById(projectId);

  if (!project) {
    throw new Error("Project not found");
  }

  const userObjectId = new mongoose.Types.ObjectId(userId);

  let isMember = false;

  if (project.members) {
    for (let i = 0; i < project.members.length; i++) {
      if (project.members[i]?.equals(userObjectId)) {
        isMember = true;
        break;
      }
    }
  }

  return isMember;
};

export default projectMembershipCheck;

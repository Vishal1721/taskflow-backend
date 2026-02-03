import Invite from "../models/inviteModels";
import Project from "../models/projectModels";
import { Types } from "mongoose";

const acceptInviteService = async (inviteToken: string) => {
  const invite = await Invite.findOne({
    token: inviteToken,
    status: "pending",
  });

  if (!invite) {
    throw new Error("Invalid or expired invite token");
  }

  const project = await Project.findById(invite.projectId);
  if (!project) {
    throw new Error("Associated project not found");
  }

  await Project.findByIdAndUpdate(invite.projectId, {
    $addToSet: { members: new Types.ObjectId(invite.id) },
  });

  invite.status = "accepted";
  invite.accepetedAt = new Date();
  await invite.save();

  return {
    message: "Invite accepted successfully",
    projectId: invite.projectId,
  };
};

export { acceptInviteService };

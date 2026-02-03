import crypto from "crypto";
import Invite, { InviteDocument } from "../models/inviteModels";
import Project from "../models/projectModels";
import { sendEmail } from "../utils/sendEmail";
import mongoose from "mongoose";

const createProjectInvite = async (
  projectId: string,
  email: string,
  inviterId: string,
): Promise<InviteDocument>=> {
  // 1️⃣ Validate project
  const project = await Project.findById(projectId);
  if (!project) {
    throw new Error("Project not found");
  }

  // 2️⃣ Only project owner can invite
  if (project.owner.toString() !== inviterId) {
    throw new Error("Only project owner can invite members");
  }

  // 3️⃣ Generate invite token
  const token = crypto.randomBytes(32).toString("hex");

  // 4️⃣ Save invite
  const invite = await Invite.create({
    email,
    projectId: new mongoose.Types.ObjectId(projectId),
    invitedBy: new mongoose.Types.ObjectId(inviterId),
    token,
  });

  // 5️⃣ Send email
  const inviteLink = `${process.env.FRONTEND_URL}/register?invite=${token}`;

  await sendEmail({
    to: email,
    subject: "You are invited to join a project on TaskFlow",
    html: `
      <p>You have been invited to join a project on <b>TaskFlow</b>.</p>
      <p>Click the link below to register and join the project:</p>
      <a href="${inviteLink}">${inviteLink}</a>
    `,
  });

  return invite;
};

export { createProjectInvite };

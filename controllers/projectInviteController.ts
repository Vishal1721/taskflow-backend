import { Request, Response } from "express";
import { createProjectInvite } from "../services/projectInviteService";

type InviteBody = {
  email: string;
};

const inviteMember = async (
  req: Request<{ id: string }, {}, InviteBody>,
  res: Response,
) => {
  try {
    const projectId = req.params.id;
    const { email } = req.body;
    const inviterId = req.user?.id;

    if (!email || !projectId || !inviterId) {
      return res.status(400).json({
        message: "Email and project ID are required",
      });
    }

    const invite = await createProjectInvite(projectId, email, inviterId);

    return res.status(200).json({
      message: "User invited successfully",
      invite,
    });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export { inviteMember };

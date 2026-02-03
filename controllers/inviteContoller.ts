import { Request, Response } from "express";
import { acceptInviteService } from "../services/inviteServices";

type InviteBody = {
  inviteToken: string;
};

const acceptInvite = async (req: Request<{}, {}, InviteBody>,res: Response) => {
  try {
    const { inviteToken } = req.body;
    console.log("INVITE TOKEN:", inviteToken);

    if (!inviteToken) {
      return res.status(400).json({ message: "Invite token is required" });
    }

    const result = await acceptInviteService(inviteToken);

    if (!result) {
      return res.status(400).json({ message: "Invalid or expired invite" });
    }

    res.status(200).json({
      message: "Invite accepted successfully",
      projectId: result.projectId,
    });
  } catch (error) {
    console.error("Error accepting invite:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default acceptInvite;

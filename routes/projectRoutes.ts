import express from "express";
import authMiddleware from "../middleware/authMiddleware";
import {
  createProject,
  getMyProjects,
  getProjectById,
} from "../controllers/projectController";
import { inviteMember } from "../controllers/projectInviteController";
import router from "./userRoutes";

// create project
router.post("/", authMiddleware, createProject);

// get my projects
router.get("/", authMiddleware, getMyProjects);

// get project details
router.get("/:id", authMiddleware, getProjectById);

// invite member
router.post("/:id/invite", authMiddleware, inviteMember);

export default router;


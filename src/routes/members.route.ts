import express from "express";
import asyncHandler from "express-async-handler";
import { verifyUser } from "../middlewares/auth.middleware";
import { addMember } from "../controllers/members.controller";
import { validate } from "../middlewares/validate.middleware";
import { createMemberSchema } from "../schemas/team.schema";

export const membersRouter = express.Router();

membersRouter.use(verifyUser);

membersRouter.post("/", validate(createMemberSchema), asyncHandler(addMember));

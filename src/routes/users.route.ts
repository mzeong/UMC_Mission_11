import express from "express";
import asyncHandler from "express-async-handler";
import { verifyUser } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { updateUserProfileSchema } from "../schemas/user-profile.schema";
import { fetchUserProfile, modifyUserProfile } from "../controllers/users.controller";
import { categoryParam } from "../schemas/fields";

export const usersRouter = express.Router();

usersRouter.use(verifyUser);

usersRouter.get("/:userId/profiles/:category", validate(categoryParam), asyncHandler(fetchUserProfile));

usersRouter.put("/profiles/:category", validate(updateUserProfileSchema), asyncHandler(modifyUserProfile));

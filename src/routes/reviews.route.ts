import express from "express";
import asyncHandler from "express-async-handler";
import { verifyUser } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { createTeamReviewSchema } from "../schemas/team-review.schema";
import { addTeamReview, addUserReview } from "../controllers/reviews.controller";

export const reviewsRouter = express.Router();

reviewsRouter.use(verifyUser);

reviewsRouter.post("/team", validate(createTeamReviewSchema), asyncHandler(addTeamReview));

reviewsRouter.post("/user", validate(createTeamReviewSchema), asyncHandler(addUserReview));

import express from "express";
import asyncHandler from "express-async-handler";
import { verifyUser } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import {
    matchingGuestingPreview,
    matchingHostingPreview,
    ApplyGuestingUserPreview,
    modifyGuestStatus,
    fetchHostingApplicantsTeamList,
    gameApplicationApproval,
} from "../controllers/matchings.controller";
import { dateQuery } from "../schemas/fields";

export const matchingsRouter = express.Router();

matchingsRouter.use(verifyUser);

matchingsRouter.get("/guesting", validate(dateQuery), asyncHandler(matchingGuestingPreview));

matchingsRouter.get("/hosting", validate(dateQuery), asyncHandler(matchingHostingPreview));

matchingsRouter.get("/hosting/user/:guestingId", asyncHandler(ApplyGuestingUserPreview));

matchingsRouter.patch("/hosting/guest/:guestUserId", asyncHandler(modifyGuestStatus));

// 호스팅 내역 > 신청팀 목록 조회
matchingsRouter.get("/hosting/team/:gameId", asyncHandler(fetchHostingApplicantsTeamList));

// 호스팅 내역 > 신청 승인
matchingsRouter.patch("/hosting/team/:gameId", asyncHandler(gameApplicationApproval));

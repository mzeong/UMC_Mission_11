import express from "express";
import asyncHandler from "express-async-handler";
import { authGoogle, authKakao, authNaver, refreshAccessToken, logout } from "../controllers/auth.controller";
import { verifyUser } from "../middlewares/auth.middleware";

export const authRouter = express.Router();

authRouter.post("/google", asyncHandler(authGoogle));

authRouter.post("/kakao", asyncHandler(authKakao));

authRouter.post("/naver", asyncHandler(authNaver));

authRouter.post("/refresh", asyncHandler(refreshAccessToken));

authRouter.post("/logout", verifyUser, asyncHandler(logout));

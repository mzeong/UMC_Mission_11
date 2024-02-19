import express from "express";
import asyncHandler from "express-async-handler";
import { verifyUser } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import {
    fetchGamesByDate,
    fetchGamesByGender,
    fetchGamesByLevel,
    fetchGamesByRegion,
    fetchGameDetail,
    addGame,
    modifyGame,
    applyGame,
} from "../controllers/games.controller";
import {
    readGameSchema,
    readGameFilterGenderSchema,
    readGameFilterLevelSchema,
    readGameFilterRegionSchema,
    createGameSchema,
    updateGameSchema,
} from "../schemas/game.schema";

export const gamesRouter = express.Router();

// 날짜별 연습경기 모집글 조회 (기본)
gamesRouter.get("/", validate(readGameSchema), asyncHandler(fetchGamesByDate));

// 연습경기 모집글 필터링 - 성별/레벨/지역
gamesRouter.get("/by-gender", validate(readGameFilterGenderSchema), asyncHandler(fetchGamesByGender));
gamesRouter.get("/by-level", validate(readGameFilterLevelSchema), asyncHandler(fetchGamesByLevel));
gamesRouter.get("/by-region", validate(readGameFilterRegionSchema), asyncHandler(fetchGamesByRegion));

// 연습경기 신청
gamesRouter.post("/:gameId/application", verifyUser, asyncHandler(applyGame));

// 연습경기 모집글 상세 조회
gamesRouter.get("/:gameId", verifyUser, asyncHandler(fetchGameDetail));

// 연습경기 모집글 작성/수정
gamesRouter.post("/", verifyUser, validate(createGameSchema), asyncHandler(addGame));
gamesRouter.put("/:gameId", verifyUser, validate(updateGameSchema), asyncHandler(modifyGame));

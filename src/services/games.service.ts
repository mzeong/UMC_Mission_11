import { BaseError } from "../../config/error";
import { status } from "../../config/response.status";
import {
    findGamesByDate,
    findGamesByGender,
    findGamesByLevel,
    findGamesByRegion,
    getGameDetail,
    insertGame,
    setGame,
    insertGameApplication,
} from "../daos/game.dao";
import {
    getTeam,
    getTeamDetailForGuesting,
    getTeamIdByLeaderId,
    getTeamCategoryByLeaderId,
    getTeamByLeaderId,
} from "../daos/team.dao";
import { addMemberCount, findMemberInfoByCategory } from "../daos/member.dao";
import { getUserInfoByCategory, userInfoAttributes } from "../daos/user.dao";
import { getGameByUserId } from "../daos/game.dao";
import { checkApplicationExisting } from "../daos/game-apply.dao";
import { readGameResponseDTO, readGameDetailResponseDTO } from "../dtos/games.dto";
import { CreateGameBody, UpdateGameBody } from "../schemas/game.schema";
import { ApplyGameBody } from "../schemas/game-apply.schema";

export const readGamesByDate = async (query) => {
    const cursorId = query.cursorId ? parseInt(query.cursorId) : undefined;
    const games = await findGamesByDate(query.date, query.category, cursorId);
    await addMemberCount(games.games);
    return readGameResponseDTO(games);
};

export const readGamesByGender = async (query) => {
    const cursorId = query.cursorId ? parseInt(query.cursorId) : undefined;
    const games = await findGamesByGender(query.date, query.category, query.gender, cursorId);
    await addMemberCount(games.games);
    return readGameResponseDTO(games);
};

export const readGamesByLevel = async (query) => {
    const cursorId = query.cursorId ? parseInt(query.cursorId) : undefined;
    const games = await findGamesByLevel(query.date, query.category, query.skillLevel, cursorId);
    await addMemberCount(games.games);
    return readGameResponseDTO(games);
};

export const readGamesByRegion = async (query) => {
    const cursorId = query.cursorId ? parseInt(query.cursorId) : undefined;
    const games = await findGamesByRegion(query.date, query.category, query.region, cursorId);
    await addMemberCount(games.games);
    return readGameResponseDTO(games);
};

export const readGameDetail = async (params) => {
    const gameId = params.gameId;
    const gameDetail = await getGameDetail(gameId);
    if (!gameDetail) {
        throw new BaseError(status.GAME_NOT_FOUND);
    }

    const teamDetail = await getTeamDetailForGuesting(gameDetail.hostTeamId);
    const leaderInfo = await getUserInfoByCategory(teamDetail.leaderId, teamDetail.category);
    const memberInfo = await findMemberInfoByCategory(gameDetail.hostTeamId, teamDetail.category);
    return readGameDetailResponseDTO(gameDetail, teamDetail, leaderInfo, memberInfo);
};

export const createGame = async (userId, body: CreateGameBody) => {
    const hostTeamId = await getTeamIdByLeaderId(userId);
    const category = await getTeamCategoryByLeaderId(userId);

    const team = await getTeamByLeaderId(hostTeamId, userId);
    if (!team) {
        throw new BaseError(status.TEAM_LEADER_NOT_FOUND);
    }

    await insertGame(hostTeamId, body, category);
    return;
};

export const updateGame = async (userId, params, body: UpdateGameBody) => {
    const gameId = params.gameId;
    const game = await getGameByUserId(gameId, userId);
    if (!game) {
        throw new BaseError(status.GAME_NOT_FOUND);
    }
    await setGame(game, body);
    return;
};

export const addGameApplication = async (userId: number, params, body: ApplyGameBody) => {
    const gameId = params.gameId;
    const teamId = body.teamId;

    // team does not exist
    const team = await getTeam(teamId);
    console.log(team);
    if (!team) {
        throw new BaseError(status.TEAM_NOT_FOUND);
    }

    // no team of which the user is a leader
    const myTeam = await getTeamByLeaderId(teamId, userId);
    if (!myTeam) {
        throw new BaseError(status.TEAM_LEADER_NOT_FOUND);
    }

    // application already exists
    const applicationExisting = await checkApplicationExisting(gameId, teamId);
    if (applicationExisting) {
        throw new BaseError(status.GAME_APPLICATION_ALREADY_EXIST);
    }

    await insertGameApplication(gameId, body);
    return;
};

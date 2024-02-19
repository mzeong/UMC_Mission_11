import { BaseError } from "../../config/error";
import { status } from "../../config/response.status";
import { v4 as uuidv4 } from "uuid";
import { CreateTeamBody, UpdateTeamBody } from "../schemas/team.schema";
import {
    findTeamPreviewByCategory,
    getTeamByLeaderId,
    getTeamDetail,
    insertTeam,
    setTeam,
    findTeamPreviewByCategoryForLeader,
} from "../daos/team.dao";
import { deleteMembers, findMemberInfoByCategory, findMemberToDelete } from "../daos/member.dao";
import { getUserInfoByCategory } from "../daos/user.dao";
import { updateOpposingTeam } from "../daos/game.dao";
import { readTeamDetailResponseDTO } from "../dtos/teams.dto";

export const readTeamPreviews = async (userId: number, query) => {
    return await findTeamPreviewByCategory(userId, query.category);
};

export const createTeam = async (userId: number, body: CreateTeamBody) => {
    await insertTeam(body, userId, uuidv4());
    return;
};

export const updateTeam = async (userId: number, params, body: UpdateTeamBody) => {
    const teamId = params.teamId;
    const team = await getTeamByLeaderId(params.teamId, userId);
    if (!team) {
        throw new BaseError(status.TEAM_NOT_FOUND);
    }

    const { memberIdsToDelete, ...bodyWithoutMemberIdsToDelete } = body;
    if (memberIdsToDelete !== undefined) {
        const members = await findMemberToDelete(memberIdsToDelete, teamId);
        if (members.length !== memberIdsToDelete?.length) {
            throw new BaseError(status.MEMBER_NOT_FOUND);
        }
        await deleteMembers(members);
    }
    await setTeam(team, bodyWithoutMemberIdsToDelete);
    return;
};

export const readTeamDetail = async (userId: number, params) => {
    const teamId = params.teamId;
    const detail = await getTeamDetail(teamId);
    if (!detail) {
        throw new BaseError(status.TEAM_NOT_FOUND);
    }
    const leaderInfo = await getUserInfoByCategory(detail.leaderId, detail.category);
    const membersInfo = await findMemberInfoByCategory(teamId, detail.category);
    return readTeamDetailResponseDTO(detail, leaderInfo, membersInfo, userId == detail.leaderId);
};

export const readTeamAvailPreviewById = async (userId, query) => {
    return await findTeamPreviewByCategoryForLeader(userId, query.category);
};

export const addOpposingTeam = async (userId: number, params, body) => {
    const gameId = params.gameId;
    const opposingTeamId = body.teamId;

    await updateOpposingTeam(gameId, opposingTeamId);
    return;
};

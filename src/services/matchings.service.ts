import { findGameByHostTeamsAndGameTime, findGameByOpposingTeamsAndGameTime } from "../daos/game.dao";
import { getApplyGuestingUser } from "../daos/guest-user.dao";
import { findGuestingByTeamsAndGameTime, findGuestingByUserAndGameTime } from "../daos/guest.dao";
import { getTeamsAppliedById } from "../daos/matching.dao";
import { getMemberCountByTeamId, addMemberCount } from "../daos/member.dao";
import { findTeamIdByLeaderId } from "../daos/team.dao";
import {
    readApplyGuestingUserResponseDTO,
    readHostingApplicantsTeamResponseDTO,
    readMatchingResponseDTO,
} from "../dtos/matchings.dto";

export const readMatchingGuesting = async (userId, query) => {
    const gameTime = query.date;
    const matchingGuestings = await findGuestingByUserAndGameTime(userId, query.date);
    const teamIds = await findTeamIdByLeaderId(userId);
    const matchingGames = await findGameByOpposingTeamsAndGameTime(teamIds, gameTime);
    await addMemberCount(matchingGuestings);
    await addMemberCount(matchingGames);
    return readMatchingResponseDTO(matchingGuestings, matchingGames);
};

export const readMatchingHosting = async (userId: number, query) => {
    const gameTime = query.date;
    const teamIds = await findTeamIdByLeaderId(userId);
    const matchingGuestings = await findGuestingByTeamsAndGameTime(teamIds, gameTime);
    const matchingGames = await findGameByHostTeamsAndGameTime(teamIds, gameTime);
    await addMemberCount(matchingGuestings);
    await addMemberCount(matchingGames);
    return readMatchingResponseDTO(matchingGuestings, matchingGames);
};

export const readApplyGuestingUser = async (params) => {
    const guestingId = params.guestingId;
    const applyGuestingUser = await getApplyGuestingUser(guestingId);
    return readApplyGuestingUserResponseDTO(applyGuestingUser);
};

export const readHostingApplicantsTeamList = async (userId, params) => {
    const gameId = params.gameId;
    const teamsApplied = await getTeamsAppliedById(gameId);
    for (const team of teamsApplied) {
        team.memberCount = await getMemberCountByTeamId(team);
    }

    return readHostingApplicantsTeamResponseDTO(teamsApplied);
};

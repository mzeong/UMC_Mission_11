import { BaseError } from "../../config/error";
import { status } from "../../config/response.status";
import {
    findGuestAll,
    findGuestByGender,
    findGuestByLevel,
    findGuestByRegion,
    getCategoryThroughTeamJoin,
    getDetailedGuesting,
    getGuestingById,
    getTeamByGuestingId,
    insertGuesting,
    setGuesting,
} from "../daos/guest.dao";
import { addMemberCount, findMemberInfoByCategory } from "../daos/member.dao";
import { getTeamByLeaderId, getTeamDetailForGuesting } from "../daos/team.dao";
import { getUserInfoByCategory, getUserProfileByCategory } from "../daos/user.dao";
import { readGuestingDetailResponseDTO, readGuestingResponseDTO } from "../dtos/guests.dto";
import { CreateGuestingBody, UpdateGuestingBody } from "../schemas/guest.schema";
import {
    insertGuestUser,
    checkForDuplicateGuestUser,
    getGuestUserById,
    getGuestIdById,
    setGuestUserStatus,
} from "../daos/guest-user.dao";

export const createGuesting = async (userId: number, body: CreateGuestingBody) => {
    const teamId = body.teamId;
    const team = await getTeamByLeaderId(teamId, userId);
    if (!team) {
        throw new BaseError(status.TEAM_LEADER_NOT_FOUND);
    }
    await insertGuesting(teamId, body);
    return;
};

export const updateGuesting = async (userId: number, params, body: UpdateGuestingBody) => {
    const guestingId = params.guestingId;
    const teamId = await getTeamByGuestingId(guestingId, userId);
    const guesting = await getGuestingById(guestingId);
    if (!guesting || !teamId) {
        throw new BaseError(status.GUEST_NOT_FOUND);
    }
    await setGuesting(guesting, body);
    return;
};

export const readGuesting = async (query) => {
    const cursorId = query.cursorId ? parseInt(query.cursorId) : undefined;
    const guestings = await findGuestAll(query.date, query.category, cursorId);
    await addMemberCount(guestings.guests);
    return readGuestingResponseDTO(guestings);
};

export const readGuestingByGender = async (query) => {
    const cursorId = query.cursorId ? parseInt(query.cursorId) : undefined;
    const guestings = await findGuestByGender(query.date, query.category, query.gender, cursorId);
    await addMemberCount(guestings.guests);
    return readGuestingResponseDTO(guestings);
};

export const readGuestingByLevel = async (query) => {
    const cursorId = query.cursorId ? parseInt(query.cursorId) : undefined;
    const guestings = await findGuestByLevel(query.date, query.category, query.level, cursorId);
    await addMemberCount(guestings.guests);
    return readGuestingResponseDTO(guestings);
};

export const readGuestingByRegion = async (query) => {
    const cursorId = query.cursorId ? parseInt(query.cursorId) : undefined;
    const guestings = await findGuestByRegion(query.date, query.category, query.region, cursorId);
    await addMemberCount(guestings.guests);
    return readGuestingResponseDTO(guestings);
};

export const readDetailedGuesting = async (params) => {
    const guestingId = params.guestingId;
    const guestingDetail = await getDetailedGuesting(guestingId);
    if (!guestingDetail) {
        throw new BaseError(status.GUEST_NOT_FOUND);
    }

    const teamDetail = await getTeamDetailForGuesting(guestingDetail.teamId);
    const leaderInfo = await getUserInfoByCategory(teamDetail.leaderId, teamDetail.category);
    const memberInfo = await findMemberInfoByCategory(guestingDetail.teamId, teamDetail.category);
    return readGuestingDetailResponseDTO(guestingDetail, teamDetail, leaderInfo, memberInfo);
};

export const addGuestUser = async (userId: number, params) => {
    const guestingId = params.guestingId;
    const category = await getCategoryThroughTeamJoin(guestingId);

    const existingGuestUser = await checkForDuplicateGuestUser(userId, guestingId);
    if (existingGuestUser) {
        throw new BaseError(status.GUESTUSER_ALREADY_EXIST);
    }

    const userProfile = await getUserProfileByCategory(userId, category);
    if (!isUserProfileValid(userProfile)) {
        throw new BaseError(status.NOT_FILL_USER_PROFILE);
    }

    await insertGuestUser(guestingId, userId);
    return;
};

const isUserProfileValid = (userProfile): boolean => {
    return (
        // userProfile["Profiles.description"] &&
        userProfile.gender && userProfile.ageGroup && userProfile["Profiles.region"]
        // userProfile.height &&
        // userProfile["Profiles.position"]
    );
};

export const updateGuestUserStatus = async (params) => {
    const guestUserId = params.guestUserId;
    const guestUser = await getGuestUserById(guestUserId);
    if (!guestUser) {
        throw new BaseError(status.GUESTUSER_NOT_FOUND);
    }

    const guestId = await getGuestIdById(guestUserId);
    const guest = await getGuestingById(guestId);
    if (guest.status) {
        throw new BaseError(status.CLOSED_GUEST);
    }

    await setGuestUserStatus(guestUser, guest);
    return;
};

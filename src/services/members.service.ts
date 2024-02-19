import { BaseError } from "../../config/error";
import { status } from "../../config/response.status";
import { insertMember, isMemberExist } from "../daos/member.dao";
import { getTeamIdByInviteCode } from "../daos/team.dao";

export const createMember = async (userId, body) => {
    const teamId = await getTeamIdByInviteCode(body.inviteCode);
    if (!teamId) {
        throw new BaseError(status.NO_JOINABLE_TEAM);
    }
    if (await isMemberExist(teamId, userId)) {
        throw new BaseError(status.ALREADY_JOINED);
    }
    await insertMember(teamId, userId);
    return;
};

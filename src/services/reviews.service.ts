import { BaseError } from "../../config/error";
import { status } from "../../config/response.status";
import { CreateTeamReviewBody } from "../schemas/team-review.schema";
import { getGame } from "../daos/game.dao";
import { findLeaderId, getLeaderId } from "../daos/team.dao";
import { getGuestingByAcceptedUserId } from "../daos/guest.dao";
import { getExistingTeamReview, insertTeamReview } from "../daos/team-review.dao";
import { CreateUserReviewBody } from "../schemas/user-review.schema";
import { getExistingUserReview, insertUserReview } from "../daos/user-review.dao";

export const createTeamReview = async (userId: number, body: CreateTeamReviewBody) => {
    const { teamMatchId, guestMatchId } = body;
    if (!(teamMatchId || guestMatchId) || (teamMatchId && guestMatchId)) {
        throw new BaseError(status.MATCH_ID_REQUIRED);
    }

    const result = await retrieveReviewedTeamIdAndGameTime(userId, teamMatchId, guestMatchId);

    //validate user write permission
    if (!result?.reviewedTeamId) {
        throw new BaseError(status.NO_REVIEW_TARGET);
    }
    validateReviewableTime(result.gameTime, getCurrentTime());
    const review = await getExistingTeamReview(userId, result.reviewedTeamId, teamMatchId, guestMatchId);
    if (review) {
        throw new BaseError(status.REVIEW_ALREADY_WRITTEN);
    }

    await insertTeamReview(userId, result.reviewedTeamId, body);
    return;
};

const retrieveReviewedTeamIdAndGameTime = async (userId: number, teamMatchId?: number, guestMatchId?: number) => {
    if (teamMatchId) {
        const teamMatch = await getGame(teamMatchId);
        const teams = await findLeaderId(teamMatch.hostTeamId, teamMatch.opposingTeamId);
        for (const team of teams) {
            if (team.leaderId == userId) {
                return { reviewedTeamId: team.id, gameTime: teamMatch.gameTime };
            }
        }
    }
    if (guestMatchId) {
        const guestMatch = await getGuestingByAcceptedUserId(guestMatchId, userId);
        return { reviewedTeamId: guestMatch?.teamId, gameTime: guestMatch?.gameTime };
    }
};

export const createUserReview = async (userId: number, body: CreateUserReviewBody) => {
    const { guestMatchId, revieweeId } = body;
    const result = await retrieveRevieweeIdAndGameTime(userId, guestMatchId, revieweeId);

    //validate user write permission
    if (!result.revieweeId) {
        throw new BaseError(status.NO_REVIEW_TARGET);
    }
    validateReviewableTime(result.gameTime, getCurrentTime());
    const review = await getExistingUserReview(userId, result.revieweeId, guestMatchId);
    if (review) {
        throw new BaseError(status.REVIEW_ALREADY_WRITTEN);
    }

    await insertUserReview(userId, body);
    return;
};

const retrieveRevieweeIdAndGameTime = async (userId: number, guestMatchId: number, revieweeId: number) => {
    const guestMatch = await getGuestingByAcceptedUserId(guestMatchId, revieweeId);
    if (!guestMatch) {
        return { revieweeId: null, gameTime: null };
    }
    const leaderId = await getLeaderId(guestMatch.teamId);
    return {
        revieweeId: userId === leaderId ? revieweeId : null,
        gameTime: guestMatch.gameTime,
    };
};

export const validateReviewableTime = (gameTime: Date, currentTime: Date) => {
    const timeDifference = currentTime.getTime() - gameTime.getTime();
    const oneMonthInMilliseconds = 30 * 24 * 60 * 60 * 1000;
    if (timeDifference < 0 && timeDifference > oneMonthInMilliseconds) {
        throw new BaseError(status.REVIEW_NOT_CURRENTLY_WRITABLE);
    }
};

const getCurrentTime = (): Date => {
    return new Date();
};

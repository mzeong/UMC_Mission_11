import { getAgeGroup } from "../constants/age-group.constant";
import { getTeamGender } from "../constants/gender.constant";
import { getGuestUserStatus } from "../constants/guest-status.constant";

export const readApplyGuestingUserResponseDTO = (result) => {
    return result.map((guestingUser) => ({
        nickname: guestingUser["User.nickname"],
        height: guestingUser["User.height"],
        avatarUrl: guestingUser["User.avatarUrl"],
        position: guestingUser["User.Profiles.position"],
        status: getGuestUserStatus(guestingUser.status),
    }));
};

export const readHostingApplicantsTeamResponseDTO = (teams) => {
    return teams.map((team) => ({
        teamId: team["Team.id"],
        teamLogo: team["Team.logo"],
        teamName: team["Team.name"],
        memberCount: team.memberCount,
    }));
};

export const readMatchingResponseDTO = (guestings, games) => {
    const sortedMatch = [...guestings, ...games].sort((a, b) => a.gameTime.getTime() - b.gameTime.getTime());
    return sortedMatch.map((match) => {
        if (match.type === "guest") {
            return {
                type: match.type,
                matchId: match.id,
                gameTime: match.gameTime,
                gameDuration: match.gameDuration,
                name: match["Team.name"],
                region: match["Team.region"],
                gender: getTeamGender(match["Team.gender"]),
                memberCount: match.memberCount,
                ageGroup: getAgeGroup(match["Team.ageGroup"]),
                skillLevel: match["Team.skillLevel"],
            };
        } else {
            return {
                type: match.type,
                matchId: match.id,
                gameTime: match.gameTime,
                gameDuration: match.gameDuration,
                name: match["HostTeam.name"],
                region: match["HostTeam.region"],
                gender: getTeamGender(match["HostTeam.gender"]),
                memberCount: match.memberCount,
                ageGroup: getAgeGroup(match["HostTeam.ageGroup"]),
                skillLevel: match["HostTeam.skillLevel"],
            };
        }
    });
};

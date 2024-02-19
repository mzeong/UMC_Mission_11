import { getGender } from "../constants/gender.constant";
import { getAgeGroup } from "../constants/age-group.constant";
import { getStatus } from "../constants/status.constant";

export const readGameResponseDTO = (result) => {
    return {
        games: result.games.map((game) => ({
            gameId: game.id,
            gameTime: game.gameTime,
            teamName: game["HostTeam.name"],
            teamRegion: game["HostTeam.region"],
            teamGender: getGender(game["HostTeam.gender"]),
            memberCount: game.memberCount,
            teamAgeGroup: getAgeGroup(game["HostTeam.ageGroup"]),
            teamSkillLevel: game["HostTeam.skillLevel"],
            status: getStatus(game.status),
        })),
        hasNext: result.hasNext,
    };
};

export const readGameDetailResponseDTO = (gameDetail, teamDetail, leaderInfo, memberInfo) => {
    const member = memberInfo.map((info) => ({
        avatarUrl: info["User.avatarUrl"],
        nickname: info["User.nickname"],
        height: info["User.height"],
        position: info["User.Profiles.position"],
    }));
    return {
        id: gameDetail.id,
        name: teamDetail.name,
        skillLevel: teamDetail.skillLevel,
        mannerLevel: teamDetail.mannerLevel,
        description: teamDetail.description,
        game_info: {
            gymName: teamDetail.gymName,
            gameTime: gameDetail.gameTime,
            gameDuration: gameDetail.gameDuration,
            gender: getGender(teamDetail.gender),
            ageGroup: getAgeGroup(teamDetail.ageGroup),
        },
        member_info: {
            leader: leaderInfo,
            member,
        },
    };
};

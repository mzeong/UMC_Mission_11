import { AgeGroup } from "../types/age-group.enum";
import { Gender } from "../types/gender.enum";

interface TeamDetail {
    name: string;
    logo: string | null;
    skillLevel: number | null;
    mannerLevel: number | null;
    description: string | null;
    inviteCode: string;
    gender: Gender;
    ageGroup: AgeGroup;
    region: string;
    gymName: string;
}

interface UserInfo {
    id: number;
    nickname: string;
    height: number | null;
    avatarUrl: string | null;
    Profiles: {
        position: string | null;
    };
}

interface MemberInfo {
    User: UserInfo;
}

export const readTeamDetailResponseDTO = (
    detail: TeamDetail,
    leaderInfo: UserInfo,
    membersInfo: MemberInfo[],
    isTeamLeader: boolean,
) => {
    const member = membersInfo.map((memberInfo: MemberInfo) => ({
        id: memberInfo["User.id"],
        avatarUrl: memberInfo["User.avatarUrl"],
        nickname: memberInfo["User.nickname"],
        height: memberInfo["User.height"],
        position: memberInfo["User.Profiles.position"],
    }));
    return {
        name: detail.name,
        logo: detail.logo,
        skillLevel: detail.skillLevel,
        mannerLevel: detail.mannerLevel,
        description: detail.description,
        inviteCode: isTeamLeader ? detail.inviteCode : null,
        gender: detail.gender,
        ageGroup: detail.ageGroup,
        region: detail.region,
        gymName: detail.gymName,
        participants: {
            leader: {
                id: leaderInfo.id,
                avatarUrl: leaderInfo.avatarUrl,
                nickname: leaderInfo.nickname,
                height: leaderInfo.height,
                position: leaderInfo["Profiles.position"],
            },
            member,
        },
        isTeamLeader,
    };
};

import { getAgeGroup } from "../constants/age-group.constant";
import { getGender } from "../constants/gender.constant";
import { AgeGroup } from "../types/age-group.enum";
import { Gender } from "../types/gender.enum";

interface ReadUserProfile {
    id: number;
    avatarUrl: string | null;
    nickname: string;
    gender: Exclude<Gender, Gender.Mixed> | null;
    ageGroup: AgeGroup | null;
    height: number | null;
    Profiles: {
        skillLevel: number;
        mannerLevel: number;
        region: string | null;
        position: string | null;
        description: string | null;
    };
}

export const readUserProfileResponseDTO = (profile: ReadUserProfile) => {
    return {
        id: profile.id,
        avatarUrl: profile.avatarUrl,
        nickname: profile.nickname,
        skillLevel: profile["Profiles.skillLevel"],
        mannerLevel: profile["Profiles.mannerLevel"],
        gender: profile.gender,
        ageGroup: profile.ageGroup,
        region: profile["Profiles.region"],
        height: profile.height,
        position: profile["Profiles.position"],
        description: profile["Profiles.description"],
    };
};

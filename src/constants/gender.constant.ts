import { Gender } from "../types/gender.enum";

const Genders: Record<Exclude<Gender, Gender.Mixed>, string> = {
    [Gender.Female]: "여성",
    [Gender.Male]: "남성",
};

const TeamGenders: Record<Gender, string> = {
    ...Genders,
    [Gender.Mixed]: "혼성",
};

export const getGender = (key: Exclude<Gender, Gender.Mixed>): string | undefined => {
    return Genders[key];
};

export const getTeamGender = (key: Gender): string | undefined => {
    return TeamGenders[key];
};

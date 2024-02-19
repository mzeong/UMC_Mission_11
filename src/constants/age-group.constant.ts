import { AgeGroup } from "../types/age-group.enum";

const AgeGroups: Record<AgeGroup, string> = {
    [AgeGroup.Teenagers]: "10대",
    [AgeGroup.Twenties]: "20대",
    [AgeGroup.Thirties]: "30대",
    [AgeGroup.Forties]: "40대",
    [AgeGroup.FiftiesAndAbove]: "50대 이상~",
};

export const getAgeGroup = (key: AgeGroup): string | undefined => {
    return AgeGroups[key];
};
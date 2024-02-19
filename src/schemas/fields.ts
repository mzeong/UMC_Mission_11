import { object, z } from "zod";
import { Gender } from "../types/gender.enum";
import { Category } from "../types/category.enum";
import { AgeGroup } from "../types/age-group.enum";

export const nicknameField = { nickname: z.string().max(10) };

export const descriptionField = { description: z.optional(z.string().max(400)) };

export const genderFieldInUser = { gender: z.optional(z.enum([Gender.Female, Gender.Male])) };

export const genderFieldInTeam = { gender: z.enum([Gender.Female, Gender.Male, Gender.Mixed]) };

const ageGroup = z.enum([
    AgeGroup.Teenagers,
    AgeGroup.Twenties,
    AgeGroup.Thirties,
    AgeGroup.Forties,
    AgeGroup.FiftiesAndAbove,
]);

export const ageGroupFieldInUser = { ageGroup: z.optional(ageGroup) };

export const ageGroupFieldInTeam = { ageGroup: ageGroup };

export const heightField = { height: z.optional(z.number().int()) };

export const regionFieldInProfile = { region: z.optional(z.string()) };

export const regionFieldInTeam = { region: z.string() };

export const positionField = { position: z.optional(z.string()) }; //TODO: 추후 enum으로 변경

export const categoryField = {
    category: z.enum([
        Category.Basketball,
        Category.Baseball,
        Category.Tennis,
        Category.Soccer,
        Category.Futsal,
        Category.Volleyball,
        Category.Bowling,
        Category.Badminton,
        Category.TableTennis,
    ]),
};

export const logoField = { logo: z.optional(z.string().max(200)) };

export const nameField = { name: z.string().max(20) };

export const gymNameField = { gymName: z.string().max(100) };

export const memberIdsToDeleteField = { memberIdsToDelete: z.optional(z.array(z.number().int())) };

export const contentFieldInPost = { content: z.string().max(1000) };

export const contentFieldInComment = { content: z.string().max(500) };

export const titleField = { title: z.string().max(30) };

export const linkField = { link: z.optional(z.string().max(200)) };

export const inviteCodeField = { inviteCode: z.string().max(100) };

export const categoryParam = object({
    params: object({
        ...categoryField,
    }),
});

export const hostTeamIdField = { hostTeamId: z.number().int().optional() };

export const gameTimeField = {
    gameTime: z.preprocess((arg) => {
        if (typeof arg == "string") {
            return new Date(arg);
        }
        return arg;
    }, z.date()),
};

export const descriptionFieldInGame = { description: z.string() };

export const teamIdField = { teamId: z.number().int() };

export const guestIdField = { guestId: z.number().int() };

export const userIdField = { userId: z.number().int() };

export const statusField = { status: z.number().int() };

export const recruitCountField = { recruitCount: z.number().int() };

export const levelField = { level: z.string().max(5) };

export const levelFieldInTeam = {
    skillLevel: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
        message: "Expected number, received a string",
    }),
};

export const skillScoreField = { skillScore: z.number().int().min(1).max(5) };

export const mannerScoreField = { mannerScore: z.number().int().min(1).max(5) };

export const guestMatchIdFieldInUserReview = { guestMatchId: z.number().int() };

export const guestMatchIdFieldInTeamReview = { guestMatchId: z.optional(z.number().int()) };

export const teamMatchIdField = { teamMatchId: z.optional(z.number().int()) };

export const revieweeIdField = { revieweeId: z.number().int() };

export const dateField = {
    date: z.preprocess((arg) => {
        if (typeof arg == "string") {
            return new Date(arg);
        }
        return arg;
    }, z.date()),
};

export const dateQuery = object({
    query: object({
        ...dateField,
    }),
});

export const rentDateField = {
    rentDate: z.optional(
        z.preprocess((arg) => {
            if (typeof arg == "string") {
                return new Date(arg);
            }
            return arg;
        }, z.date()),
    ),
};

export const rentPlaceField = { rentPlace: z.optional(z.string().max(100)) };

export const rentStatusField = { status: z.optional(z.number().int()) };

export const gameDurationField = { gameDuration: z.string() };

export const avatarUrlField = { avatarUrl: z.optional(z.string().max(200)) };

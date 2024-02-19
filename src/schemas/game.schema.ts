import { TypeOf, object, z } from "zod";
import {
    hostTeamIdField,
    gameTimeField,
    descriptionFieldInGame,
    categoryField,
    dateField,
    levelFieldInTeam,
    regionFieldInTeam,
    genderFieldInTeam,
    gameDurationField,
} from "./fields";

const body = object({
    ...hostTeamIdField,
    ...gameTimeField,
    ...gameDurationField,
    ...descriptionFieldInGame,
});

export const createGameSchema = object({
    body: body,
});

export type CreateGameBody = TypeOf<typeof body>;

export const updateGameSchema = object({
    body: body,
});

export type UpdateGameBody = TypeOf<typeof body>;

export const readGame = {
    ...categoryField,
    ...dateField,
};

export const readGameSchema = object({
    query: object({
        ...readGame,
    }),
});

export const readGameFilterGenderSchema = object({
    query: object({
        ...readGame,
        ...genderFieldInTeam,
    }),
});

export const readGameFilterLevelSchema = object({
    query: object({
        ...readGame,
        ...levelFieldInTeam,
    }),
});

export const readGameFilterRegionSchema = object({
    query: object({
        ...readGame,
        ...regionFieldInTeam,
    }),
});

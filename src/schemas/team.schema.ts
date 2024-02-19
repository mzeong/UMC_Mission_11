import { TypeOf, object } from "zod";
import {
    ageGroupFieldInTeam,
    categoryField,
    descriptionField,
    genderFieldInTeam,
    gymNameField,
    inviteCodeField,
    logoField,
    memberIdsToDeleteField,
    nameField,
    regionFieldInTeam,
} from "./fields";

const commonFields = {
    ...logoField,
    ...nameField,
    ...descriptionField,
    ...genderFieldInTeam,
    ...ageGroupFieldInTeam,
    ...regionFieldInTeam,
    ...gymNameField,
};

const createTeamBody = object({
    ...commonFields,
    ...categoryField,
});

const updateTeamBody = object({
    ...commonFields,
    ...memberIdsToDeleteField,
});

const updateTeamBodyWithoutMemberIdsToDelete = object({
    ...commonFields,
});

const createMemberBody = object({
    ...inviteCodeField,
});

export const createTeamSchema = object({
    body: createTeamBody,
});

export const updateTeamSchema = object({
    body: updateTeamBody,
});

export const createMemberSchema = object({
    body: createMemberBody,
});

export const readTeamPreviewsSchema = object({
    query: object({
        ...categoryField,
    }),
});

export type CreateTeamBody = TypeOf<typeof createTeamBody>;
export type UpdateTeamBody = TypeOf<typeof updateTeamBody>;
export type UpdateTeamBodyWithoutMemberIdsToDelete = TypeOf<typeof updateTeamBodyWithoutMemberIdsToDelete>;
export type CreateMemberBody = TypeOf<typeof createMemberBody>;

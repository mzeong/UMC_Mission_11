import { TypeOf, object } from "zod";
import {
    ageGroupFieldInUser,
    categoryField,
    descriptionField,
    genderFieldInUser,
    nicknameField,
    positionField,
    regionFieldInProfile,
    heightField,
    avatarUrlField,
} from "./fields";

const commonFields = {
    ...avatarUrlField,
    ...nicknameField,
    ...genderFieldInUser,
    ...ageGroupFieldInUser,
    ...heightField,
};

const categoryFields = {
    ...descriptionField,
    ...regionFieldInProfile,
    ...positionField,
};

const body = object({
    ...commonFields,
    ...categoryFields,
});

const commonProfile = object(commonFields);

const categoryProfile = object(categoryFields);

export const updateUserProfileSchema = object({
    params: object({
        ...categoryField,
    }),
    body: body,
});

export type UpdateUserProfileBody = TypeOf<typeof body>;
export type CommonProfile = TypeOf<typeof commonProfile>;
export type CategoryProfile = TypeOf<typeof categoryProfile>;

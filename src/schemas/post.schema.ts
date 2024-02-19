import { TypeOf, object } from "zod";
import { contentFieldInPost, linkField, titleField, rentDateField, rentPlaceField } from "./fields";

const body = object({
    ...titleField,
    ...contentFieldInPost,
    ...linkField,
    ...rentDateField,
    ...rentPlaceField,
});

export const createPostSchema = object({
    body: body,
});

export type CreatePostBody = TypeOf<typeof body>;

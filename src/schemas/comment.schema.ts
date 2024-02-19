import { TypeOf, object, z } from "zod";
import { contentFieldInComment } from "./fields";

const body = object({
    ...contentFieldInComment,
});

export const createCommentSchema = object({
    body: body,
});

export type CreateCommentBody = TypeOf<typeof body>;

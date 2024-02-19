import { TypeOf, object } from "zod";
import { guestMatchIdFieldInUserReview, mannerScoreField, revieweeIdField, skillScoreField } from "./fields";

const createUserReviewBody = object({
    ...revieweeIdField,
    ...guestMatchIdFieldInUserReview,
    ...skillScoreField,
    ...mannerScoreField,
});

export const createTeamReviewSchema = object({
    body: createUserReviewBody,
});

export type CreateUserReviewBody = TypeOf<typeof createUserReviewBody>;

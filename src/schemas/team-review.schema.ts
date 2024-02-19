import { TypeOf, object } from "zod";
import { guestMatchIdFieldInTeamReview, mannerScoreField, skillScoreField, teamMatchIdField } from "./fields";

const createTeamReviewBody = object({
    ...teamMatchIdField,
    ...guestMatchIdFieldInTeamReview,
    ...skillScoreField,
    ...mannerScoreField,
});

export const createTeamReviewSchema = object({
    body: createTeamReviewBody,
});

export type CreateTeamReviewBody = TypeOf<typeof createTeamReviewBody>;

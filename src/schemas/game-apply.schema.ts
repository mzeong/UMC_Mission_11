import { TypeOf, object, z } from "zod";
import { teamIdField } from "./fields";

// export const applyGame = object({
//     teamIdField,
// });

const gameApplyBody = object({
    ...teamIdField,
});

export const applyGameSchema = object({
    body: gameApplyBody,
});

export type ApplyGameBody = TypeOf<typeof gameApplyBody>;

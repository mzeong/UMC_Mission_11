import db from "../models";

export const checkApplicationExisting = async (gameId: number, teamId: number) => {
    return await db.GameApply.findOne({
        raw: true,
        where: {
            gameId,
            teamId,
        },
    });
};

import db from "../models";

export const getTeamsAppliedById = async (gameId: number) => {
    return await db.GameApply.findAll({
        raw: true,
        where: { gameId: gameId },
        include: [
            {
                model: db.Team,
                attributes: ["id", "name", "logo"],
            },
        ],
    });
};

import db from "../models";

export const findImage = async (postId: number) => {
    return await db.Image.findAll({
        where: {
            postId,
        },
        attributes: ["url"],
    });
};

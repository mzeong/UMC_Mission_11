import db from "../models";

export const insertOrDeleteBookmark = async (userId: number, postId: number) => {
    const bookmark = await getBookmark(userId, postId);
    if (bookmark) {
        await bookmark.destroy();
    } else {
        await db.Bookmark.create({
            postId,
            userId,
        });
    }
};

export const getBookmark = async (userId: number, postId: number) => {
    return await db.Bookmark.findOne({
        where: {
            postId,
            userId,
        },
    });
};

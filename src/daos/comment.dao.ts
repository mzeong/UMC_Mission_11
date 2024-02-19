import db from "../models";
import { CreateCommentBody } from "../schemas/comment.schema";
import { calculateHasNext, generateCursorCondition } from "../utils/paging.util";

const defaultLimit = 20;

export const findComment = async (postId: number, cursorId: number | undefined) => {
    const commentsBeforeCursorForPost = { postId, ...generateCursorCondition(cursorId) };

    const comments = await db.Comment.findAll({
        raw: true,
        where: commentsBeforeCursorForPost,
        order: [["createdAt", "DESC"]],
        limit: defaultLimit,
        include: [
            {
                model: db.User,
                attributes: ["nickname"],
            },
        ],
        attributes: ["id", "content", "createdAt"],
    });

    const ascendingComments = comments.sort((a, b) => a.id - b.id);
    return { ascendingComments, hasNext: calculateHasNext(ascendingComments, defaultLimit) };
};

export const getCommentCount = async (postId: number) => {
    return await db.Comment.count({
        where: {
            postId,
        },
    });
};

export const insertComment = async (userId: number, postId: number, body: CreateCommentBody) => {
    await db.Comment.create({
        postId,
        authorId: userId,
        content: body.content,
    });
};

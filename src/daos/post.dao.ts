import db from "../models";
import { Op, Sequelize } from "sequelize";
import { CreatePostBody } from "../schemas/post.schema";
import { PostType } from "../types/post-type.enum";
import { calculateHasNext, generateCursorCondition } from "../utils/paging.util";

const defaultLimit = 20;

export const findPostByType = async (
    userId: number | undefined,
    date: string | undefined,
    cursorId: number | undefined,
    type: PostType,
) => {
    const postsBeforeCursorByType = { type, ...generateCursorCondition(cursorId) };

    if (type === PostType.RentalInfo) {
        return findRentPostByDate(userId, date, postsBeforeCursorByType);
    } else {
        return findPostByFilter(userId, postsBeforeCursorByType);
    }
};

export const findPostByAuthorId = async (userId: number, cursorId?: number) => {
    const postsBeforeCursorForAuthor = { authorId: userId, ...generateCursorCondition(cursorId) };
    return findPostByFilter(userId, postsBeforeCursorForAuthor);
};

export const findBookmarkedPost = async (userId: number, cursorId?: number) => {
    const postsBeforeCursor = generateCursorCondition(cursorId);
    const includeBookmarkedPosts = [
        {
            model: db.Bookmark,
            where: {
                userId,
            },
            attributes: ["id"],
        },
    ];
    return findPost(postsBeforeCursor, includeBookmarkedPosts);
};

export const getPost = async (postId: number) => {
    return await db.Post.findOne({
        raw: true,
        where: {
            id: postId,
        },
        attributes: ["title", "content", "link"],
    });
};

const findPostByFilter = async (userId: number | undefined, postFilter: object) => {
    const includeAllPosts: any[] = [];
    if (userId) {
        includeAllPosts.push({
            model: db.Bookmark,
            where: {
                userId,
            },
            required: false,
            attributes: ["id"],
        });
    }
    return findPost(postFilter, includeAllPosts);
};

const findRentPostByDate = async (userId: number | undefined, date, postFilter: object) => {
    const posts = await db.Post.findAll({
        raw: true,
        where: {
            [Op.and]: [
                postFilter,
                Sequelize.literal(`DATE_FORMAT(rent_date, '%Y-%m-%d') = DATE_FORMAT('${date}', '%Y-%m-%d')`),
            ],
        },

        order: [["createdAt", "DESC"]],
        limit: defaultLimit,
        attributes: ["id", "title", "content", "rentStatus"],
    });
    return { posts, hasNext: calculateHasNext(posts, defaultLimit) };
};

const findPost = async (postFilter: object, bookmarkInclude: Array<any>) => {
    const posts = await db.Post.findAll({
        raw: true,
        where: postFilter,
        order: [["createdAt", "DESC"]],
        limit: defaultLimit,
        attributes: ["id", "title", "createdAt"],
        include: bookmarkInclude,
    });
    return { posts, hasNext: calculateHasNext(posts, defaultLimit) };
};

export const insertPost = async (userId: number, data: CreatePostBody, type: PostType) => {
    await db.Post.create({
        title: data.title,
        content: data.content,
        link: data.link,
        authorId: userId,
        rentDate: data.rentDate,
        rentPlace: data.rentPlace,
        rentStatus: 0,
        type,
    });
};

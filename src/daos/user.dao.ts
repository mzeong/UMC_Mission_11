import db from "../models";
import { CommonProfile } from "../schemas/user-profile.schema";
import { Category } from "../types/category.enum";
import { Provider } from "../types/provider.enum";

export const getUserByProviderId = async (provider: Provider, providerId: string) => {
    return await db.User.findOne({
        raw: true,
        where: {
            provider,
            providerId,
        },
    });
};

export const insertUser = async (provider: Provider, providerId: string, nickname: string) => {
    return await db.User.create({
        nickname,
        provider,
        providerId,
    });
};

export const setRefreshToken = async (refreshToken: string | null, userId: number) => {
    await db.User.update(
        { refreshToken },
        {
            where: {
                id: userId,
            },
        },
    );
};

export const getRefreshToken = async (userId: number) => {
    const user = await db.User.findOne({
        raw: true,
        where: {
            id: userId,
        },
        attributes: ["refreshToken"],
    });
    return user.refreshToken;
};

export const getUser = async (userId: number) => {
    return await db.User.findOne({
        raw: true,
        where: {
            id: userId,
        },
    });
};

export const getUserInfoByCategory = async (userId: number, category: Category) => {
    return await db.User.findOne({
        raw: true,
        where: {
            id: userId,
        },
        attributes: ["id", "nickname", "height", "avatarUrl"],
        include: [
            {
                model: db.Profile,
                where: {
                    category,
                },
                required: false,
                attributes: ["position"],
            },
        ],
    });
};

export const getUserInfoById = async (userId: number) => {
    throw new Error("더 이상 사용되지 않는 함수");
    return await db.User.findOne({
        raw: true,
        where: {
            id: userId,
        },
        attributes: userInfoAttributes(),
    });
};

export const userInfoAttributes = () => {
    return ["nickname", "height"];
};

export const getUserProfileByCategory = async (userId: number, category: Category) => {
    return await db.User.findOne({
        raw: true,
        where: {
            id: userId,
        },
        include: [
            {
                model: db.Profile,
                where: {
                    category,
                },
                required: false,
                attributes: ["skillLevel", "mannerLevel", "region", "position", "description"],
            },
        ],
        attributes: ["id", "nickname", "gender", "ageGroup", "height", "avatarUrl"],
    });
};

export const setCommonProfile = async (userId: number, commonProfile: CommonProfile) => {
    await db.User.update(
        { ...commonProfile },
        {
            where: {
                id: userId,
            },
        },
    );
};

import { BaseError } from "../../config/error";
import { status } from "../../config/response.status";
import { Category } from "../types/category.enum";
import { Payload } from "../types/payload.interface";
import { UserInfo } from "../types/user-info.interface";
import { UpdateUserProfileBody, CategoryProfile } from "../schemas/user-profile.schema";
import {
    getUser,
    getUserByProviderId,
    getUserProfileByCategory,
    insertUser,
    setCommonProfile,
    setRefreshToken,
} from "../daos/user.dao";
import { getUserProfile, insertCategoryProfile, setCategoryProfile } from "../daos/profile.dao";
import { readUserProfileResponseDTO } from "../dtos/users.dto";

export const createOrReadUser = async (userInfo: UserInfo): Promise<Payload> => {
    let user = await getUserByProviderId(userInfo.provider, userInfo.providerId);
    if (!user) {
        user = await insertUser(userInfo.provider, userInfo.providerId, userInfo.nickname);
    }
    return { id: user.id, nickname: user.nickname };
};

export const updateRefreshToken = async (refreshToken: string, userId: number) => {
    await setRefreshToken(refreshToken, userId);
};

export const readUserProfile = async (params) => {
    const profile = await getUserProfileByCategory(params.userId, params.category);
    if (!profile) {
        throw new BaseError(status.USER_NOT_FOUND);
    }
    return readUserProfileResponseDTO(profile);
};

export const deleteRefreshToken = async (userId: number) => {
    await setRefreshToken(null, userId);
};

export const updateUserProfile = async (userId, params, body: UpdateUserProfileBody) => {
    const user = await getUser(userId);
    if (!user) {
        throw new BaseError(status.USER_NOT_FOUND);
    }

    const { description, region, position, ...commonProfile } = body;
    await setCommonProfile(userId, commonProfile);
    await createOrUpdateCategoryProfile(userId, params.category, { description, region, position });
    return;
};

const createOrUpdateCategoryProfile = async (userId: number, category: Category, categoryProfile: CategoryProfile) => {
    const profile = await getUserProfile(userId, category);
    if (!profile) {
        await insertCategoryProfile(userId, category, categoryProfile);
    } else {
        await setCategoryProfile(profile.id, categoryProfile);
    }
};

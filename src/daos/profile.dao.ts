import db from "../models";
import { CategoryProfile } from "../schemas/user-profile.schema";
import { Category } from "../types/category.enum";

const defaultLevel = 0;

export const getUserProfile = async (userId: number, category: Category) => {
    return await db.Profile.findOne({
        raw: true,
        where: {
            userId,
            category,
        },
        attributes: ["id"],
    });
};

export const insertCategoryProfile = async (userId: number, category: Category, categoryProfile: CategoryProfile) => {
    await db.Profile.create({
        userId,
        category,
        skillLevel: defaultLevel,
        mannerLevel: defaultLevel,
        ...categoryProfile,
    });
};

export const setCategoryProfile = async (id: number, categoryProfile: CategoryProfile) => {
    await db.Profile.update(
        { ...categoryProfile },
        {
            where: {
                id,
            },
        },
    );
};

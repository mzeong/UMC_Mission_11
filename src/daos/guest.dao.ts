import db from "../models";
import { CreateGuestingBody, UpdateGuestingBody } from "../schemas/guest.schema";
import { Op, Sequelize } from "sequelize";
import { Category } from "../types/category.enum";
import { Gender } from "../types/gender.enum";
import { BaseError } from "../../config/error";
import { status } from "../../config/response.status";
import { MatchType } from "../types/match-type.enum";
import { calculateHasNext, generateCursorCondition } from "../utils/paging.util";

const defaultLimit = 20;

export const insertGuesting = async (teamId: number, data: CreateGuestingBody) => {
    await db.Guest.create({
        teamId: teamId,
        gameTime: data.gameTime,
        description: data.description,
        recruitCount: data.recruitCount,
        gameDuration: data.gameDuration,
        status: 0,
    });
};

export const setGuesting = async (guesting, body: UpdateGuestingBody) => {
    Object.keys(body).forEach((field) => {
        guesting[field] = body[field];
    });
    await guesting.save();
};

export const findGuestAll = (date: string, category: Category, cursorId: number | undefined) => {
    const guestsBeforeCursor = generateCursorCondition(cursorId);
    const TeamFilter = { category };
    return findGuests(date, guestsBeforeCursor, TeamFilter);
};

export const findGuestByGender = (date: string, category: Category, gender: Gender, cursorId: number | undefined) => {
    const guestsBeforeCursor = generateCursorCondition(cursorId);
    const TeamFilter = { gender, category };
    return findGuests(date, guestsBeforeCursor, TeamFilter);
};

export const findGuestByLevel = (date: string, category: Category, level: string, cursorId: number | undefined) => {
    const guestsBeforeCursor = generateCursorCondition(cursorId);
    const minLevel = Math.floor(parseInt(level) / 10) * 10;
    const TeamFilter = { skillLevel: { [Op.between]: [minLevel, minLevel + 9] }, category };
    return findGuests(date, guestsBeforeCursor, TeamFilter);
};

export const findGuestByRegion = (date: string, category: Category, region: string, cursorId: number | undefined) => {
    const guestsBeforeCursor = generateCursorCondition(cursorId);
    const TeamFilter = { region, category };
    return findGuests(date, guestsBeforeCursor, TeamFilter);
};

export const findGuests = async (date: string, guestFilter: object, TeamFilter: object) => {
    const guests = await db.Guest.findAll({
        raw: true,
        where: {
            ...guestFilter,
            [Op.and]: Sequelize.literal(`DATE_FORMAT(game_time, '%Y-%m-%d') = DATE_FORMAT('${date}', '%Y-%m-%d')`),
        },
        order: [["gameTime", "DESC"]],
        limit: defaultLimit,
        include: [
            {
                model: db.Team,
                where: TeamFilter,
                attributes: ["id", "name", "region", "gender", "ageGroup", "skillLevel"],
            },
        ],
        attributes: ["id", "gameTime", "recruitCount", "gameDuration", "status"],
    });
    return { guests, hasNext: calculateHasNext(guests, defaultLimit) };
};

export const getDetailedGuesting = async (guestingId: number) => {
    return await db.Guest.findOne({
        raw: true,
        where: {
            id: guestingId,
        },
        attributes: ["teamId", "gameTime", "description", "recruitCount", "gameDuration", "status"],
    });
};

export const getTeamByGuestingId = async (guestingId: number, userId: number) => {
    return await db.Guest.findOne({
        where: {
            id: guestingId,
        },
        include: {
            model: db.Team,
            where: {
                leaderId: userId,
            },
            attributes: [],
        },
        attributes: ["teamId"],
    });
};

export const getGuestingById = async (guestingId: number) => {
    return await db.Guest.findOne({
        where: {
            id: guestingId,
        },
    });
};

export const getGuestingByAcceptedUserId = async (guestingId: number, userId: number) => {
    return await db.Guest.findOne({
        raw: true,
        where: {
            id: guestingId,
        },
        include: [
            {
                model: db.GuestUser,
                where: {
                    userId,
                    status: 1,
                },
                attributes: [],
            },
        ],
        attributes: ["teamId", "gameTime"],
    });
};

export const getCategoryThroughTeamJoin = async (guestingId: number) => {
    const guest = await db.Guest.findOne({
        raw: true,
        where: {
            id: guestingId,
        },
        include: [
            {
                model: db.Team,
                attributes: ["category"],
            },
        ],
        attributes: [],
    });
    if (!guest) {
        throw new BaseError(status.GUEST_NOT_FOUND);
    }
    return guest["Team.category"];
};

export const findGuestingByTeamsAndGameTime = async (teamIds: number[], gameTime: string) => {
    const guestResults = await db.Guest.findAll({
        raw: true,
        where: {
            teamId: {
                [Op.in]: teamIds,
            },
            [Op.and]: Sequelize.literal(`DATE_FORMAT(game_time, '%Y-%m-%d') = DATE_FORMAT('${gameTime}', '%Y-%m-%d')`),
        },
        include: [
            {
                model: db.Team,
                attributes: ["id", "name", "region", "gender", "ageGroup", "skillLevel"],
            },
        ],
        attributes: ["id", "gameTime", "gameDuration"],
    });
    for (const guestResult of guestResults) {
        guestResult.type = MatchType.guest;
    }
    return guestResults;
};

export const findGuestingByUserAndGameTime = async (userId: number, date: string) => {
    const guestResults = await db.Guest.findAll({
        raw: true,
        where: {
            [Op.and]: Sequelize.literal(`DATE_FORMAT(game_time, '%Y-%m-%d') = DATE_FORMAT('${date}', '%Y-%m-%d')`),
        },
        include: [
            {
                model: db.Team,
                attributes: ["id", "name", "region", "gender", "ageGroup", "skillLevel"],
            },
            {
                model: db.GuestUser,
                where: {
                    userId,
                    status: 1,
                },
                attributes: [],
            },
        ],
        attributes: ["id", "gameTime", "gameDuration"],
    });
    for (const guestResult of guestResults) {
        guestResult.type = MatchType.guest;
    }
    return guestResults;
};

import db from "../models";
import { Op } from "sequelize";
import { Category } from "../types/category.enum";

export const findMemberInfoByCategory = async (teamId: number, category: Category) => {
    return await db.Member.findAll({
        raw: true,
        where: {
            teamId,
        },
        include: [
            {
                model: db.User,
                attributes: ["id", "nickname", "height", "avatarUrl"],
                include: [
                    {
                        model: db.Profile,
                        where: {
                            category: category,
                        },
                        required: false,
                        attributes: ["position"],
                    },
                ],
            },
        ],
        attributes: [],
    });
};

export const findMemberInfoWithoutLeaderByTeamId = async (teamId, userInfoAttributes) => {
    const team = await db.Team.findByPk(teamId);
    if (!team) {
        throw new Error("Team not found");
    }
    const leaderId = team.leaderId;

    // 리더 제외한 멤버들 조회
    return await db.Member.findAll({
        raw: true,
        where: {
            teamId: teamId,
            userId: {
                [Op.ne]: leaderId,
            },
        },
        include: [
            {
                model: db.User,
                attributes: userInfoAttributes(),
            },
        ],
        attributes: [],
    });
};

export const insertMember = async (teamId: number, userId: number) => {
    await db.Member.create({
        teamId,
        userId,
    });
};

export const isMemberExist = async (teamId: number, userId: number) => {
    const member = await db.Member.findOne({
        where: {
            teamId,
            userId,
        },
    });
    return member !== null;
};

export const findMemberToDelete = async (memberIdsToDelete: number[], teamId: number) => {
    return await db.Member.findAll({
        where: {
            teamId,
            userId: {
                [Op.in]: memberIdsToDelete,
            },
        },
    });
};

export const deleteMembers = async (members) => {
    for (const member of members) {
        await member.destroy();
    }
};

export const getMemberCountByTeamId = async (teamId) => {
    const count = await db.Member.count({
        where: {
            teamId,
        },
    });
    return count;
};

export const addMemberCount = async (lists) => {
    console.log("addMemberCount 함수는 제거될 함수입니다");
    for (const list of lists) {
        const teamId = list["Team.id"] ?? list["HostTeam.id"];
        list.memberCount = (await getMemberCountByTeamId(teamId)) + 1;
    }
};

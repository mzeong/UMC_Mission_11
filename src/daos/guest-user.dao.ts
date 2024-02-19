import db from "../models";

export const insertGuestUser = async (guestingId: number, userId: number) => {
    await db.GuestUser.create({
        guestId: guestingId,
        userId: userId,
        status: 0,
    });
};

export const getApplyGuestingUser = async (guestingId: number) => {
    return await db.GuestUser.findAll({
        raw: true,
        where: {
            guestId: guestingId,
        },
        include: [
            {
                model: db.User,
                include: [
                    {
                        model: db.Profile,
                        attributes: ["position"],
                    },
                ],
                attributes: ["nickname", "height", "avatarUrl"],
            },
        ],
        attributes: ["status"],
    });
};

export const getGuestUserById = async (guestUserId: number) => {
    return await db.GuestUser.findOne({
        where: {
            id: guestUserId,
        },
    });
};

export const getGuestIdById = async (guestUserId: number) => {
    const guest = await db.GuestUser.findOne({
        where: {
            id: guestUserId,
        },
        attributes: ["guestId"],
    });
    return guest?.guestId;
};

export const checkClosedGuest = async (guestId: number) => {
    const count = await db.GuestUser.count({
        where: {
            guestId: guestId,
            status: 1,
        },
    });
    const recruitCount = await db.Guest.findOne({
        where: {
            id: guestId,
        },
        attributes: ["recruitCount"],
    });
    console.log(count, recruitCount.recruitCount, count >= recruitCount.recruitCount);
    return count >= recruitCount.recruitCount;
};

export const setGuestUserStatus = async (guestUser, guest) => {
    guestUser.status = 1;
    await guestUser.save();
    const check: boolean = await checkClosedGuest(guest.id);
    if (check) {
        guest.status = 1;
        await guest.save();
    }
};

export const checkForDuplicateGuestUser = async (userId, guestId) => {
    return await db.GuestUser.findOne({
        raw: true,
        where: {
            userId,
            guestId,
        },
    });
};

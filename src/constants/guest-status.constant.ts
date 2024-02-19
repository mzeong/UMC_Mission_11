const guestStatus: Record<number, string> = {
    0: "미승인",
    1: "승인",
};

export const defaultStatus = 0;

export const getGuestUserStatus = (key: number): string | undefined => {
    return guestStatus[key];
};

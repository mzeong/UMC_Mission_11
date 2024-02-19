const Statuses: Record<number, string> = {
    0: "모집 중",
    1: "모집 완료",
};

export const defaultStatus = 0;

export const getStatus = (key: number): string | undefined => {
    return Statuses[key];
};

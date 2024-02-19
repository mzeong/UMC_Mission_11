import { Op } from "sequelize";

export const generateCursorCondition = (cursorId: number | undefined) =>
    cursorId ? { id: { [Op.lt]: cursorId } } : {};

export const calculateHasNext = (items: Array<any>, limit: number) => items.length === limit;

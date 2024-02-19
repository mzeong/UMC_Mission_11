import { Status } from "./response.status";

export interface Response {
    isSuccess: boolean;
    code: number | string;
    message: string;
    detail?: any;
    result?: any;
}

export const response = ({ isSuccess, code, message, detail }: Status, result?: any): Response => {
    return {
        isSuccess: isSuccess,
        code: code,
        message: message,
        detail: detail,
        result: result,
    };
};

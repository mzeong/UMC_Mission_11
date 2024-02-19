import { BaseError } from "../../config/error";
import { status } from "../../config/response.status";
import { NextFunction, Response } from "express";
import { extractAccessToken, extractAccessTokenFromHeader, verifyAccessToken } from "../utils/jwt.util";

export const verifyUser = (req, res: Response, next: NextFunction) => {
    const accessToken = extractAccessToken(req);
    const verified = verifyAccessToken(accessToken);
    if (verified.isExpired) {
        throw new BaseError(status.ACCESS_TOKEN_EXPIRED);
    } else {
        req.user = {
            id: verified.decoded.id,
            nickname: verified.decoded.nickname,
        };
        next();
    }
};

export const verifyUserIfExists = (req, res: Response, next: NextFunction) => {
    const accessToken = extractAccessTokenFromHeader(req);
    if (accessToken) {
        const verified = verifyAccessToken(accessToken);
        if (verified.isExpired) {
            throw new BaseError(status.ACCESS_TOKEN_EXPIRED);
        } else {
            req.user = {
                id: verified.decoded.id,
                nickname: verified.decoded.nickname,
            };
            next();
        }
    }
    next();
};

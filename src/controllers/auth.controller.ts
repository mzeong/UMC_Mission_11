import { Request, Response } from "express";
import { response } from "../../config/response";
import { status } from "../../config/response.status";
import { googleLogin, kakaoLogin, naverLogin, generateNewAccessToken, logoutUser } from "../services/auth.service";

export const authGoogle = async (req, res: Response, next) => {
    res.send(response(status.SUCCESS, await googleLogin(req.body)));
};

export const authKakao = async (req, res: Response, next) => {
    res.send(response(status.SUCCESS, await kakaoLogin(req.body)));
};

export const authNaver = async (req, res: Response, next) => {
    res.send(response(status.SUCCESS, await naverLogin(req.body)));
};

export const refreshAccessToken = async (req: Request, res: Response, next) => {
    res.send(response(status.SUCCESS, await generateNewAccessToken(req)));
};

export const logout = async (req, res: Response, next) => {
    res.send(response(status.SUCCESS, await logoutUser(req.user.id)));
};

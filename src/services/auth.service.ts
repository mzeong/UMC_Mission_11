import { Request } from "express";
import { createOrReadUser, updateRefreshToken, deleteRefreshToken } from "./users.service";
import { BaseError } from "../../config/error";
import { status } from "../../config/response.status";
import { getRefreshToken } from "../daos/user.dao";
import {
    generateAccessToken,
    generateRefreshToken,
    extractAccessToken,
    extractRefreshToken,
    verifyAccessToken,
    isRefreshTokenValid,
} from "../utils/jwt.util";
import redaxios from "redaxios";
import { UserInfo } from "../types/user-info.interface";
import { Provider } from "../types/provider.enum";
import { Payload } from "../types/payload.interface";

export const tokenType = "Bearer ";

export const googleLogin = async (body) => {
    const accessToken = await getGoogleAccessToken(body.code);
    const userInfo = await getGoogleUserInfo(accessToken);
    const payload = await createOrReadUser(userInfo);
    return login(payload);
};

const getGoogleAccessToken = async (code: string) => {
    const url = "https://oauth2.googleapis.com/token";
    const response = await redaxios.post(
        `${url}?client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${process.env.GOOGLE_CLIENT_SECRET}&code=${code}&grant_type=authorization_code&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}`,
    );
    return response.data.access_token;
};

const getGoogleUserInfo = async (accessToken: string) => {
    const url = "https://www.googleapis.com/userinfo/v2/me";
    const response = await redaxios.get(`${url}?access_token=${accessToken}`);
    return {
        provider: Provider.Google,
        providerId: response.data.id,
        nickname: response.data.name,
    };
};

export const kakaoLogin = async (body) => {
    const accessToken = await getKakaoAccessToken(body.code);
    const userInfo = await getKakaoUserInfo(accessToken);
    const payload = await createOrReadUser(userInfo);
    return login(payload);
};

const getKakaoAccessToken = async (code: string) => {
    const url = "https://kauth.kakao.com/oauth/token";
    const response = await redaxios.post(
        `${url}?grant_type=authorization_code&client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&code=${code}`,
        {
            headers: {
                "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
            },
        },
    );
    return response.data.access_token;
};

const getKakaoUserInfo = async (accessToken: string): Promise<UserInfo> => {
    const url = "https://kapi.kakao.com/v2/user/me";
    const response = await redaxios.get(url, {
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
    });
    return {
        provider: Provider.Kakao,
        providerId: response.data.id,
        nickname: response.data.kakao_account.profile.nickname,
    };
};

export const naverLogin = async (body) => {
    const accessToken = await getNaverAccessToken(body.code, body.state);
    const userInfo = await getNaverUserInfo(accessToken);
    const payload = await createOrReadUser(userInfo);
    return login(payload);
};

const getNaverAccessToken = async (code: string, state: string) => {
    const url = "https://nid.naver.com/oauth2.0/token";
    const response = await redaxios.get(url, {
        params: {
            grant_type: "authorization_code",
            client_id: process.env.NAVER_CLIENT_ID,
            client_secret: process.env.NAVER_CLIENT_SECRET,
            code: code,
            state: state,
        },
    });
    return response.data.access_token;
};

const getNaverUserInfo = async (accessToken: string): Promise<UserInfo> => {
    const url = "https://openapi.naver.com/v1/nid/me";
    const response = await redaxios.get(url, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return {
        provider: Provider.Naver,
        providerId: response.data.response.id,
        nickname: response.data.response.name,
    };
};

export const login = async (payload: Payload) => {
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken();
    await updateRefreshToken(refreshToken, payload.id);
    return { tokenType, accessToken, refreshToken };
};

export const generateNewAccessToken = async (req: Request) => {
    const accessToken = extractAccessToken(req);
    const refreshToken = extractRefreshToken(req);
    const verified = verifyAccessToken(accessToken);
    if (verified.isExpired) {
        if (isRefreshTokenValid(refreshToken) && (await isRefreshTokenMatching(refreshToken, verified.decoded.id))) {
            return await login({ id: verified.decoded.id, nickname: verified.decoded.nickname });
        }
        throw new BaseError(status.REFRESH_TOKEN_VERIFICATION_FAILED);
    }
    throw new BaseError(status.ACCESS_TOKEN_NOT_EXPIRED);
};

const isRefreshTokenMatching = async (refreshToken, userId: number) => {
    return refreshToken === (await getRefreshToken(userId));
};

export const logoutUser = async (userId: number) => {
    await deleteRefreshToken(userId);
    return;
};

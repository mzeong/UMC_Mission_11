import { Response } from "express";
import { response } from "../../config/response";
import { status } from "../../config/response.status";
import { readUserProfile, updateUserProfile } from "../services/users.service";

export const fetchUserProfile = async (req, res: Response, next) => {
    res.send(response(status.SUCCESS, await readUserProfile(req.params)));
};

export const modifyUserProfile = async (req, res: Response, next) => {
    res.send(response(status.SUCCESS, await updateUserProfile(req.user.id, req.params, req.body)));
};

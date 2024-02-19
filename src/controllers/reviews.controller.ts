import { Response } from "express";
import { response } from "../../config/response";
import { status } from "../../config/response.status";
import { createTeamReview, createUserReview } from "../services/reviews.service";

export const addTeamReview = async (req, res: Response, next) => {
    res.send(response(status.SUCCESS, await createTeamReview(req.user.id, req.body)));
};

export const addUserReview = async (req, res: Response, next) => {
    res.send(response(status.SUCCESS, await createUserReview(req.user.id, req.body)));
};

import { Response } from "express";
import { response } from "../../config/response";
import { status } from "../../config/response.status";
import {
    readGuesting,
    readGuestingByLevel,
    readGuestingByGender,
    readGuestingByRegion,
    readDetailedGuesting,
    createGuesting,
    addGuestUser,
    updateGuesting,
} from "../services/guests.service";

export const addGuesting = async (req, res: Response, next) => {
    res.send(response(status.SUCCESS, await createGuesting(req.user.id, req.body)));
};

export const modifyGuesting = async (req, res: Response, next) => {
    res.send(response(status.SUCCESS, await updateGuesting(req.user.id, req.params, req.body)));
};

export const GuestingPreview = async (req, res: Response, next) => {
    res.send(response(status.SUCCESS, await readGuesting(req.query)));
};

export const GuestingPreviewByLevel = async (req, res: Response, next) => {
    res.send(response(status.SUCCESS, await readGuestingByLevel(req.query)));
};

export const GuestingPreviewByGender = async (req, res: Response, next) => {
    res.send(response(status.SUCCESS, await readGuestingByGender(req.query)));
};

export const GuestingPreviewByRegion = async (req, res: Response, next) => {
    res.send(response(status.SUCCESS, await readGuestingByRegion(req.query)));
};

export const DetailedGuestingPreview = async (req, res: Response, next) => {
    res.send(response(status.SUCCESS, await readDetailedGuesting(req.params)));
};

export const applicationGuesting = async (req, res: Response, next) => {
    res.send(response(status.SUCCESS, await addGuestUser(req.user.id, req.params)));
};

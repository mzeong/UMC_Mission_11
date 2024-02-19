import { response } from "../../config/response";
import { status } from "../../config/response.status";
import {
    readGamesByDate,
    readGamesByGender,
    readGamesByLevel,
    readGamesByRegion,
    readGameDetail,
    createGame,
    updateGame,
    addGameApplication,
} from "../services/games.service";
import { readTeamAvailPreviewById } from "../services/teams.service";

export const fetchGamesByDate = async (req, res, next) => {
    res.send(response(status.SUCCESS, await readGamesByDate(req.query)));
};

export const fetchGamesByGender = async (req, res, next) => {
    res.send(response(status.SUCCESS, await readGamesByGender(req.query)));
};

export const fetchGamesByLevel = async (req, res, next) => {
    res.send(response(status.SUCCESS, await readGamesByLevel(req.query)));
};

export const fetchGamesByRegion = async (req, res, next) => {
    res.send(response(status.SUCCESS, await readGamesByRegion(req.query)));
};

export const fetchGameDetail = async (req, res, next) => {
    res.send(response(status.SUCCESS, await readGameDetail(req.params)));
};

export const addGame = async (req, res, next) => {
    return res.send(response(status.SUCCESS, await createGame(req.user.id, req.body)));
};

export const modifyGame = async (req, res, next) => {
    return res.send(response(status.SUCCESS, await updateGame(req.user.id, req.params, req.body)));
};

export const applyGame = async (req, res, next) => {
    return res.send(response(status.SUCCESS, await addGameApplication(req.user.id, req.params, req.body)));
};

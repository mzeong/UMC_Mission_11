import { response } from "../../config/response";
import { status } from "../../config/response.status";
import { createMember } from "../services/members.service";

export const addMember = async (req, res, next) => {
    res.send(response(status.SUCCESS, await createMember(req.user.id, req.body)));
};

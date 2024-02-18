import express from "express";
import {
  healthController,
  dotEnvController,
} from "../controllers/health.controller";

export const healthRoute = express.Router();

healthRoute.get("", healthController);

// healthRoute.get("/dot-env", dotEnvController);

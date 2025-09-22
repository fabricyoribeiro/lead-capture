import { Router } from "express";
import lead from "../modules/lead/index.js";

const leadRoutes = Router()

leadRoutes.post("/", lead.create)

export {leadRoutes}
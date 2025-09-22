import { Router } from "express";
import lead from "../modules/lead/index.js";

const leadRoutes = Router()

leadRoutes.post("/", lead.create)
leadRoutes.get("/", lead.getAll)
leadRoutes.get("/filter-by-status/:status", lead.filterByStatus)
leadRoutes.get("/filter-by-date/:date", lead.filterByDate)

export {leadRoutes}
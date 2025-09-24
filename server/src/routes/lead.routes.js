import { Router } from "express";
import lead from "../modules/lead/index.js";

const leadRoutes = Router()

leadRoutes.post("/", lead.create)
leadRoutes.get("/", lead.getAll)
leadRoutes.get("/filter-by-status/:status", lead.filterByStatus)
leadRoutes.get("/number-by-status", lead.getNumberOfLeadsByStatus)
leadRoutes.get("/filter-by-date/:date", lead.filterByDate)
leadRoutes.get("/search-by-name/:name", lead.findLeadByName)
leadRoutes.put("/update-status/:id", lead.updateStatus)

export {leadRoutes}
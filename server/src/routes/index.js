import express from 'express'

import { leadRoutes } from './lead.routes.js'

const routes = express()

routes.use("/lead", leadRoutes)

export {routes}
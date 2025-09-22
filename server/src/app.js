import express from 'express'
import { routes } from './routes/index.js'

const app = express()

app.use(express.json())

app.use(routes)

app.use('/', (request, response) => {
    return response.status(200).json({message: 'API online'})
})

export {app}
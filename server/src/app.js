import express from 'express'
import cors from 'cors'
import { routes } from './routes/index.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use(routes)

app.use('/', (request, response) => {
    return response.status(200).json({message: 'API online'})
})

export default {app}
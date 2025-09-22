import express from 'express'

const app = express()

app.use(express.json())

app.use('/', (request, response) => {
    return response.status(200).json({message: 'API online'})
})

export {app}
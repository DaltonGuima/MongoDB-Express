import express, { request, response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { personRouter } from './routes/personRoutes';
// dp aprendo a usar .env

const app = express()

app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(express.json())

app.use(cors())

// API routes

app.use('/person', personRouter)

// endspoints

app.get('/', async (request, response) => {
    response.json({ message: 'teste' })
})

const DB_USER = 'Daltoba'
const DB_PASSWORD = encodeURIComponent('PnmA8xVsZ866gyTy')

mongoose
    .connect(
        `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster0.hutlzk8.mongodb.net/?retryWrites=true&w=majority`
    )
    .then(() => {
        console.log('Conectou com sucesso')
        app.listen(3333)
    })
    .catch(err => console.log(err))


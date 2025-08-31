import express from 'express'
import filmeRouter from './routes/filmeRoutes.js'
import cors from "cors"

const app = express()
app.use(express.json())
app.use(cors())
app.use("/", filmeRouter)

export default app
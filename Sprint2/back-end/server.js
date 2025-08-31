import mongoose from "mongoose"
import dotenv from "dotenv"
import app from "./app.js"

dotenv.config()

const PORT = 8080
const MONGO_URI = process.env.MONGODB_URI

mongoose.connect(MONGO_URI).then(() => {
    console.log("Conectado ao banco!")
    app.listen(PORT, () => console.log("Servidor rodando"))
}).catch(err => console.error(err))

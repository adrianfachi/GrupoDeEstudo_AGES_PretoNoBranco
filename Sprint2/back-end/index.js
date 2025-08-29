import express from 'express';
import dotenv from 'dotenv'
import mongoose, { mongo } from 'mongoose';
import filmes from './filmes.js'
import cors from "cors"

dotenv.config();

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors())

const mongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Conectado ao banco!")
    } catch (error) {
        console.log("Erro ao conectar ao banco!", error)
    }
}
mongoDB();

//CREATE
app.post("/cadastrar", async (req, res) => {
    try {
        const novoFilme = await filmes.create(req.body)
        res.json(novoFilme)
    } catch (error) {
        res.json(error)
        console.log(error)
    }
})

//READ
app.get("/filmes", async (req, res) => {
    try {
        const todosFilmes = await filmes.find()
        res.json(todosFilmes)
    } catch (error) {
        console.log(error)
    }
})

//READ ID
app.get("/filmes/:id", async (req, res) => {
    try {
        const filme = await filmes.findById(req.params)
        res.json(filme)
    } catch (error) {
        console.log(error)
    }
})

//UPDATE
app.put("/filmes/:id", async (req, res) => {
    try {
        const { id } = req.params
        const atualizaFilme = await filmes.findByIdAndUpdate(id, req.body, { new: true})
        res.json(atualizaFilme)
    } catch (error) {
        res.json(error)
    }
})

//UPDATE
app.patch("/filmes/:id", async (req, res) => {
    try {
        const { id } = req.params
        const atualizaParcialFilme = await filmes.findByIdAndUpdate(id, req.body, { new: true})
        res.json(atualizaParcialFilme)
    } catch (error) {
        res.json(error)
    }
})

//DELETE
app.delete("/filmes/:id", async (req, res) => {
    try {
        const deletaFilme = await filmes.findByIdAndDelete(req.params.id)
        res.json(deletaFilme)
    } catch (error) {
        console.log(error)
        res.json(error)
    }
})


app.listen(PORT,() =>console.log(`server: http://localhost:${PORT}`))
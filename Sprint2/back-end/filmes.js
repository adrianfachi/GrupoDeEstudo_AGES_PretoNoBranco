import mongoose from "mongoose";

const filmeSchema = new mongoose.Schema({
    nome: String,
    genero: String,
    nota: Number,
    reviews: Object
})

export default mongoose.model('filmes', filmeSchema)
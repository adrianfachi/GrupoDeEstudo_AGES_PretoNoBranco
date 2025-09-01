import Filme from "../models/Filme.js"

const filmeService = {
    getFilme: async () => {
        try {
            const filmes = await Filme.find()
            return filmes
        } catch (error) {
            console.log(error)
        }
    },

    getFilmeById: async (id) => {
        try {
            const filme = await Filme.findById(id)
            if (!filme) {
                return 'filme não encontrado'
            }
            return filme
        } catch (error) {
            console.log(error)
        }
    },

    createFilme: async (data) => {
        try {
            const newFilme = await Filme.create(data)
            return newFilme
        } catch (error) {
            console.log(error)
        }
    },

    updateFilme: async (id, data) => {
        try {
            const filme = await Filme.findByIdAndUpdate(id, data, {new: true})
            if (!filme) {
                return 'filme não encontrado'
            }
            return filme
        } catch (error) {
            console.log(error)
        }
    },

    deleteFilme: async (id) => {
        try {
            const filme = await Filme.findByIdAndDelete(id)
            if(!filme) {
                return 'filme não encontrado'
            }
            return filme
        } catch (error) {
            console.log(error)
        }
    }
}

export default filmeService
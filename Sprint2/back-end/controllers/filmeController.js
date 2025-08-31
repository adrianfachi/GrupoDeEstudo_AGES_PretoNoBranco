import filmeService from "../services/filmeService.js";

const filmeController = {
    addFilme: async (req, res) => {
        const filme = await filmeService.createFilme(req.body)
        res.status(201).json(filme)
    },

    getFilme: async (req, res) => {
        const filme = await filmeService.getFilmeById(req.params.id)
        res.status(201).json(filme)
    },

    getAllFilme: async (req, res) => {
        const filme = await filmeService.getFilme()
        res.status(201).json(filme)
    },

    updateFilme: async (req, res) => {
        const filme = await filmeService.updateFilme(req.params.id, req.body)
        res.status(201).json(filme)
    },

    deleteFilme: async (req, res) => {
        const filme = await filmeService.deleteFilme(req.params.id)
        res.status(201).json(filme)
    }
}

export default filmeController
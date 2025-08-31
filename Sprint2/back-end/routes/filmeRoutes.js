import { Router } from "express";
import filmeController from "../controllers/filmeController.js";

const filmeRouter = Router()

filmeRouter.post("/filmes", filmeController.addFilme);
filmeRouter.get("/filmes", filmeController.getAllFilme);
filmeRouter.get("/filmes/:id", filmeController.getFilme);
filmeRouter.patch("/filmes/:id", filmeController.updateFilme);
filmeRouter.delete("/filmes/:id", filmeController.deleteFilme);

export default filmeRouter
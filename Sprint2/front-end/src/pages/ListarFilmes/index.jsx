import styles from "./styleFilmes.module.css"
import { useState } from "react"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import api  from "../../services/api.js"
import semCapa from "../../assets/semCapa.png"

function ListarFilmes() {
    const [filmes, setFilmes] = useState();
    const [pesquisaTermo, setPesquisaTermo] = useState('');

    useEffect(() => {
        async function carregaFilmes() {
            const { data:res } = await api.get('/filmes')
            setFilmes(res)
        }
        carregaFilmes()

    }, [])
    
    let procuraFilme = [];

    if (!filmes) {
        procuraFilme = [];
    } else if (pesquisaTermo === "") {
        procuraFilme = filmes;
    } else {
        procuraFilme = filmes.filter((filme) =>
            filme.nome.toLowerCase().includes(pesquisaTermo.toLowerCase()) ||
            filme.genero.toLowerCase().includes(pesquisaTermo.toLowerCase())
        );
    }

    function calcMedia(reviews) {
        if (reviews.length > 0) {
            let soma = 0;
            for (let index = 0; index < reviews.length; index++) {
                soma += parseFloat(reviews[index].nota)
            }
            return (soma/reviews.length).toFixed(2) + "/10"
        } else {
            return "sem notas"
        }
    }

    return (
        <div id={styles.principal}>
            <h1>Lista de filmes</h1>
            <Link to="/cadastro" id={styles.link}>Cadastrar novo filme</Link>
            <input type="text" placeholder="Pesquisar..." id={styles.pesquisa} onChange={(e) => setPesquisaTermo(e.target.value)}/>
            <ul id={styles.lista}>
                {procuraFilme && procuraFilme.length > 0 ? (
                    procuraFilme.map((filme) => (
                        <li key={filme._id} className={styles.filmes}>
                            <div className={styles.filme}>
                                <div>
                                    {filme.linkCapa ? (
                                        <img src={filme.linkCapa} alt="" className={styles.img}/>
                                    ):(
                                        <img src={semCapa} alt="" className={styles.img}/>
                                    )}
                                    
                                </div>
                                <div className={styles.descricaoFilme}>
                                    <div>
                                        <p>• Filme: {filme.nome}</p>
                                        <p>• Gênero: {filme.genero}</p>
                                        <p>• Nota Média: {calcMedia(filme.reviews)}</p>
                                    </div>
                                    <Link to={{pathname: "/review",search: `?query=${filme._id}`,}} className={styles.reviews}>Ver reviews</Link>
                                </div>
                            </div>
                            
                        </li>
                    ))
                ) : (
                    <p>Nenhum filme encontrado</p>
                )}
            </ul>
        </div>  
    )
}

export default ListarFilmes
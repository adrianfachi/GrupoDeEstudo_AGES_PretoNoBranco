import styles from "./styleCadastro.module.css"
import { useRef } from "react"
import { useState } from "react"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import api from "../../services/api.js"

function CadastrarFilme() {
    const [filmes, setFilmes] = useState();

    useEffect(() => {
        async function carregaFilmes() {
            const { data:res } = await api.get('/filmes')
            setFilmes(res)
        }
        carregaFilmes()

    }, [])

    const nomeValue = useRef();
    const generoValue = useRef();
    const linkTrailer = useRef();
    const linkCapa = useRef();

    async function enviarInfo(event) {
        try {
            if(validaNome() && validaGenero()) {
                await api.post("/filmes", {
                    nome: nomeValue.current.value,
                    genero: generoValue.current.value,
                    linkTrailer: linkTrailer.current.value,
                    linkCapa: linkCapa.current.value,
                    reviews: []
                })
            } else {
                event.preventDefault()
            }
        } catch (error) {
            console.log(error)
        }
    }

    function validaNome() {
        if(nomeValue.current.value === "") {
            nomeValue.current.style.border = 'solid red'
            return false
        } else {
            nomeValue.current.style.border = 'none'
            const existe = filmes?.some(
                filme => filme.nome.toLowerCase() === nomeValue.current.value.toLowerCase()
            )
            if(!existe) {
                return true
            } else {
                alert("Esse filme ja foi adicionado!")
                return false
            }
            
        }
    }

    function validaGenero() {
        if(generoValue.current.value === "") {
            generoValue.current.style.border = 'solid red'
            return false
        } else {
            generoValue.current.style.border = 'none'
            return true
        }
    }

    return (
        <div id={styles.principal}>
            <h2 id={styles.titulo}>Cadastrar Filme</h2>
            <form id={styles.formulario} onSubmit={enviarInfo}>
                <input ref={nomeValue} className={styles.info} placeholder="Nome" type="text"/>
                <input ref={generoValue} className={styles.info} placeholder="Gênero" type="text"/>
                <input ref={linkTrailer} type="text" className={styles.info} placeholder="Link Trailer"/>
                <input ref={linkCapa} type="text" className={styles.info} placeholder="Link Capa"/>
                <button id={styles.cadastrar}>Cadastro</button>
            </form>
            <Link to="/" id={styles.menu}>Menu principal</Link>
        </div>  
    )
}

export default CadastrarFilme
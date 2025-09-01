import styles from "./styleReview.module.css"
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from 'react';
import { useSearchParams  } from 'react-router-dom';
import { Link } from "react-router-dom";
import api from '../../services/api.js'

function reviewsFilmes() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [filme, setFilme] = useState();
    const query = searchParams.get('query');

    const review = useRef();
    const nota = useRef();

    useEffect(() => {
        async function carregaFilme() {
            const { data:res } = await api.get(`/filmes/${query}`)
            setFilme(res)
        }
        carregaFilme()
    }, [])

    async function addReview(event) {
        try {
            event.preventDefault()
            if(verificaNovoReview() && verificaNota()) {
                const reviews = [...filme.reviews]
                reviews.push(
                    {
                        review: review.current.value,
                        nota: nota.current.value
                    }
                )
                await api.patch(`/filmes/${query}`, {
                    reviews: reviews
                })
                setFilme({...filme, reviews: reviews})
                review.current.value = ""
                nota.current.value = ""
            }
        } catch (error) {
            console.log(error)
        }
    }

    function verificaNovoReview() {
        if (review.current.value != "") {
            review.current.style.border = "1px solid black"
            return true
        } else {
            review.current.style.border = "solid red"
            return false
        }
    }

    function verificaNota() {
        if (nota.current.value != "") {
            nota.current.style.border = "1px solid black"
            return true
        } else {
            nota.current.style.border = "solid red"
            return false
        }
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

    function videoURL() {
        try {
            if(filme.linkTrailer != undefined) {
                const URLWatch = filme.linkTrailer
                return URLWatch.replace("https://www.youtube.com/watch?v=", "https://www.youtube.com/embed/")
            } else {
                return false
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div id={styles.principal}>
            {filme ? (
                <>
                    <Link to={"/"} id={styles.link}>Voltar</Link>
                    <div id={styles.titulo}>
                        <h1>{filme.nome}</h1>
                        <p id={styles.genero}>{filme.genero}</p>
                        <p>Nota Média: {calcMedia(filme.reviews)}</p>
                        {filme.linkTrailer ? (
                            <iframe src={videoURL()} id={styles.videoTrailer}></iframe>
                        ) : (
                            <p></p>
                        )}
                    </div>
                    <div>
                        <form id={styles.formulario} onSubmit={addReview}>
                            <textarea id={styles.novaReview} ref={review} placeholder="Descrição do review"/>
                            <div>
                                <p>Nota:</p>
                                <select name="nota" ref={nota} id={styles.nota}>
                                <option value=""></option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                            </select>
                            </div>
                            <button type="submit" onClick={addReview} id={styles.adicionar}>Adicionar review</button>
                        </form>
                    </div>
                    <ul id={styles.reviews}>
                        {filme.reviews?.length > 0 ? (
                        filme.reviews.map((reviews, index) => (
                            <li key={index} className={styles.review}>
                                <p>Nota: {reviews.nota}</p>
                                <p>{reviews.review}</p>
                            </li>
                            
                        )
                    )) : (
                        <p>Sem reviews ainda</p>
                    )}
                    </ul>
                </>
            ):(
                <p>filme não encontrado</p>
            )}
            
        </div>
    )
}

export default reviewsFilmes
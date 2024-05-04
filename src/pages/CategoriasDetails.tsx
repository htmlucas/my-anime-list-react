import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Card } from "../components/Card"

interface ICategorias {
    id: string,
    title:string,
    img: string | null,
    description:string,
    animes: [
        {
            id: string,
            title: string,
            description: string,
            img: string | null
        }
    ]
}

interface Anime {
    id: string,
    title:string,
    description:string,
    img: string | null
}

const Categorias = () => {
    const url = 'http://localhost:5000/'
    const { id } = useParams()
    const [ categoria, setCategoria ] = useState<ICategorias>()
    const navigate = useNavigate()

    console.log(id)

    useEffect( () =>  {
        if(id){
            console.log('entrou',id)
            axios.get(url+'categorie/'+id)
            .then( (response) => {
                console.log(response)
                setCategoria(response.data)
            })
            .catch ((error) => {
                console.log('entrou no error')                
                console.log(error.response.data.message)
            })
        }
    },[])

    const getAnime = (anime: Anime) => {
        navigate('/anime/'+anime.id)
    }

    const categorias = () => {
        navigate('/categorias')
    }

    return (
        <div className="container">
            <div className="text-uppercase backtoPerfil mb-4" onClick={() => categorias()} style={{ alignSelf: "flex-start", marginLeft: "10px" }}>
                <i className="bi bi-arrow-return-left" style={{ marginRight: "10px" }}></i>
                Voltar a categorias
            </div>
            <div className="col-12">
                <div className="row">
                    <div className="col-4">
                        <h1>Categoria {categoria?.title}</h1>
                        <p>{categoria?.description}</p>
                    </div>                    
                </div>
                <hr />
                <div className="row">                    
                        { categoria && 
                            categoria.animes.map( (content) => {
                                return (
                                    <Card
                                        key={content.id}
                                        anime={content}
                                        getContent={() => getAnime(content)}                               
                                    />
                                )
                            })
                        }
                </div>
            </div>
        </div>
    )
}

export default Categorias 
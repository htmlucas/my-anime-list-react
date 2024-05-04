import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

interface Anime {
    id: string,
    title: string,
    description: string,
    img: string | null
}


const AnimeDetails = () => {
    const url = 'http://localhost:5000/'
    const { id } = useParams()
    const [ anime, setAnime ] = useState<Anime>()
    const navigate = useNavigate()
    const defaultImage = '/images/default.png';

    console.log(id)

    useEffect( () =>  {
        if(id){
            console.log('entrou',id)
            axios.get(url+'anime/'+id)
            .then( (response) => {
                console.log(response)
                setAnime(response.data)
            })
            .catch ((error) => {
                console.log('entrou no error')                
                console.log(error.response.data.message)
            })
        }
    },[])

    const home = () => {
        navigate('/')
    }

    console.log(anime)    
    return (
        
        <div className="container d-flex flex-column align-items-center vh-80">
            <div className="text-uppercase backtoPerfil mb-4" onClick={() => home()} style={{ alignSelf: "flex-start", marginLeft: "10px" }}>
                <i className="bi bi-arrow-return-left" style={{ marginRight: "10px" }}></i>
                Voltar a Home
            </div>
            <div className="card mb-3" style={{ width: "36rem" }}>
                <img 
                    src={defaultImage}
                    className="card-img-top" 
                    alt="Anime Image"
                    style={{ objectFit: "cover", width: "100%", height: "100%" }}
                />
                <div className="card-body">
                    <h5 className="card-title">{anime?.title}</h5>
                    <p className="card-text">{anime?.description}</p>
                </div>
            </div>
        </div>

    


    )
}

export default AnimeDetails
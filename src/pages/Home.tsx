import { useContext, useEffect, useState } from "react";
import { Card } from "../components/Card"
import axios from "axios";
import { AppContext } from "../components/AppContext";
import { useNavigate } from "react-router-dom";

interface Anime {
    id: string,
    title:string,
    description:string,
    img: string | null
}

const Home = () => {

    const url = 'http://localhost:5000/'
    const [ anime, setAnime ] = useState<Anime[]>([])
    const { isLoggedIn, user } = useContext(AppContext)
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(url+'animes')
        .then( (response) => {
            //console.log(response.data)
            setAnime(response?.data)            
            
        })
        .catch ((error) => {
            console.log('entrou no error')

            console.log(error.response?.data.message)
        })
    },[])

    const getAnime = (anime: Anime) => {
        navigate('/anime/'+anime.id)
    }

    return (
        <div className="container">
            <div className="col-12">
                <div className="row">
                    
                    {anime.map((content) => {
                        return (                            
                            <Card
                                key={content.id}
                                anime={content}
                                getContent={() => getAnime(content)}                               
                            />
                        )
                    })}                     
                                            
                </div>
            </div>            
        </div>
    )
}

export default Home;
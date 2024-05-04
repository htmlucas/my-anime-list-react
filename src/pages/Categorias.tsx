import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Categorias = () => {

    interface Categoria {
        id: string,
        title:string,
        img: string | null,
        description:string,
    }

    const url = 'http://localhost:5000/'
    const [ categoria, setCategoria ] = useState<Categoria[]>([])
    const navigate = useNavigate()    

    useEffect(() => {
        axios.get(url+'categories')
            .then( (response) => {
                //console.log(response.data)
                setCategoria(response?.data)            
                
            })
            .catch ((error) => {
                console.log('entrou no error')

                console.log(error.response?.data.message)
            })
    },[])

    const getContent = (categoria: Categoria) => {
        console.log(categoria)
        navigate('/categoria/'+categoria.id)
    }


    return (
        <div className="container">
            <div className="col-12">
                <div className="row">
                    <div className="col-12">
                        <h1>Categorias</h1>
                    </div>
                </div>
                <div className="row">
                    {categoria.map((content) => {
                            return (                                                                
                                <Card
                                    key={content.id}
                                    anime={content}
                                    getContent={() => getContent(content)}
                                />
                            )
                    })} 
                </div>
            </div>            
        </div>
    )
}

export default Categorias;
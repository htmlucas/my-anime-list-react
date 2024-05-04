import axios from "axios"
import { useState } from "react"
import { Alert } from "../services/alert"


const CadastroCategorias = () => {
    const url = 'http://localhost:5000/'
    const [ title, setTitle] = useState<string>('')
    const [ description, setDescription] = useState<string>('')
    const [ validator, setValidator ]  = useState(false)

    const cadastrarCategoria = async(title: string, description: string) => {
        setValidator(false)  

        if(title.length <= 0 || description.length <= 0){
            setValidator(!validator)            
        }
        setTitle(title)
        setDescription(description)
        console.log('title',title)
        console.log('description',description)

        axios.post(url+'categorie/create',{
            title: title,
            description: description
        })
        .then( (response) => {
            console.log('response',response)
            Alert('Sucesso!', response.data.message,'success')
        })
        .catch ((error) => {
            console.log('entrou no error')
            Alert('Erro!',error.response.data.message,'error')
            console.log(error.response.data.message)
        })
        
    }

    return (
        <>
        <div className="container">
            <div className="card">
                <div className="card-header">
                    <h5 className="card-title">Cadastrar categoria</h5>
                </div>
                <div className="card-body">
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Titulo</label>
                        <input type="text" name="title" value={title} onChange={ (event) => setTitle(event.target.value)} className="form-control" id="title" placeholder="Ação..."/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Descrição</label>
                        <textarea className="form-control" value={description} onChange={ (event) => setDescription(event.target.value)} id="description" ></textarea>
                    </div>
                    <button className="btn btn-primary" type="submit" onClick={() => cadastrarCategoria(title, description)}>Cadastrar</button>
                    {
                        validator &&
                        <div className="alert alert-warning alert-dismissible fade show mt-2" role="alert">
                            <strong>Atenção!</strong> Preencha todos os campos.
                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setValidator(false)}></button>
                        </div>

                    }
                </div>                
            </div>
        </div>
        </>
    )
}

export default CadastroCategorias 
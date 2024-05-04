import { useEffect, useState } from "react"
import axios from 'axios';
import { Alert } from "../services/alert";

interface Categories {
    id: string,
    title: string,
    description: string
}

const CadastroAnimes = () => {
    const url = 'http://localhost:5000/'
    const [ title, setTitle] = useState<string>('')
    const [ description, setDescription] = useState<string>('')
    const [ categorie, setCategorie] = useState<Categories[]>([])
    const [ validator, setValidator ]  = useState(false)
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    useEffect( () => {
        axios.get(url+'categories')
        .then( (response) => {
            console.log('response',response)
            setCategorie(response.data)
        })
        .catch ((error) => {
            console.log('entrou no error')
            console.log(error.response.data.message)
        })
    },[])

    useEffect(() => {
        setSelectedCategory(categorie.length > 0 ? categorie[0].id : ''); // Define o valor inicial se houver pelo menos uma categoria
    }, [categorie]); // Executa o efeito quando 'categorie' mudar

    const cadastrarAnime = async(title: string, description: string, categoryId: string) => {
        setValidator(false)  

        if(title.length <= 0 || description.length <= 0 || categoryId.length <= 0){
            setValidator(!validator)            
        }
        setTitle(title)
        setDescription(description)
        setSelectedCategory(categoryId)
        console.log('title',title)
        console.log('description',description)
        console.log('categoria',selectedCategory)

        axios.post(url+'anime/create',{
            title: title,
            description: description,
            categoryId: categoryId
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
                    <h5 className="card-title">Cadastrar anime</h5>
                </div>
                <div className="card-body">
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Titulo</label>
                        <input type="text" name="title" value={title} onChange={ (event) => setTitle(event.target.value)} className="form-control" id="title" placeholder="Naruto"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Descrição</label>
                        <textarea className="form-control" value={description} onChange={ (event) => setDescription(event.target.value)} id="description" ></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="categories" className="form-label">Categoria</label>
                        <select name="id_categorie" value={selectedCategory} onChange={(event) => setSelectedCategory(event.target.value)} className="form-select">
                            <option disabled>Selecione uma categoria</option>
                            {
                                categorie && categorie.map((content) => (
                                    <option key={content.id} value={content.id}>{content.title}</option>
                                ))
                            }
                        </select>
                    </div>
                    <button className="btn btn-primary" type="submit" onClick={() => cadastrarAnime(title, description,selectedCategory)}>Cadastrar</button>
                    {
                        
                        validator && (
                            <>
                                <div className="alert alert-warning alert-dismissible fade show mt-2" role="alert">
                                    <strong>Atenção!</strong> Preencha todos os campos.
                                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setValidator(false)}></button>
                                </div>
                            </>

                        )                        
                    }
                </div>                
            </div>
        </div>
        </>
    )
}

export default CadastroAnimes;
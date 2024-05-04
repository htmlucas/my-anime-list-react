import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AppContext } from "../../components/AppContext"
import axios from "axios"
import ModalCadastroLista from "../../components/ModalCadastrolista"
import { Alert } from "../../services/alert";
import { CardList } from "../../components/CardList";
import "../../styles/perfil.css"

interface IUserDetails{
    userId: string,
    nickname: string,
    email: string,    
    bio: string | null,
    cep: string | null,
    cidade: string | null,
    estado: string | null,    
    pais: string | null
}

interface List {
    id_lists: string,
    user_Id:string,
    name:string,
    created_at: Date
}

const Perfil = () => {
    const url = 'http://localhost:5000/'
    const [ userDetails, setUserDetails ] = useState<null | IUserDetails>()
    const [ name, setName ] = useState<string>('')
    const [ list, setList ]  = useState<List[]>([])
    const [ render, setRender ] = useState<Boolean>(false)
    const { id } = useParams()
    const navigate = useNavigate()    

    const storage = useContext(AppContext)
    const token = localStorage.getItem('token');

    !storage.isLoggedIn && navigate('/')

    const Header = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }

    const fecthData = async () => {
        try{
            await axios.get(url+'user/'+id,{
                headers: Header,
            }).then(response => {
                setUserDetails(response.data)
            })
            

            await axios.get(url+'lists/'+id,{
                headers: Header
            }).then(response => {
                setList(response.data)
            })
            
    
        }catch (error) {
            console.log('Entrou no erro',error);
        }
    } 

    useEffect(() => {               
        fecthData();
    },[])

    useEffect(() => {
        if (userDetails && id !== userDetails.userId) {
          navigate("/");
        }
    }, []);


    const editPerfil = () => {
        navigate('/perfil/edit/'+id)
    }

    const cadastrarLista = async(name:string) => {

        if(name.length <= 0 ){
            Alert('Erro!','O campo nome precisa ser preenchido','error')         
        }

        axios.post(url+'list/create',{
            name: name,
            user_id:id
        })
        .then( (response) => {
            if(response.data.id_lists){
                setRender(!render)
                Alert('Sucesso!', 'Lista adicionada com sucesso.','success')
                fecthData()              
            }            
            setName('')
        })
        .catch ((error) => {
            console.log('entrou no error')
            Alert('Erro!',error.response.data.message,'error')
            console.log(error.response.data.message)
        })
        
    }
    
    return (
        <div className="container-fluid">
            <div className="col-12">
                <div className="row">
                    <div className="col-3">
                        <div className="card mb-3" style={{minHeight:'80vh'}}>                   
                            <div className="d-flex justify-content-end mb-3 m-3">
                                <div className="clickable-icon d-flex justify-content-center align-items-center" onClick={() => editPerfil()} data-bs-toggle="tooltip" data-bs-placement="right" title="Editar perfil">
                                    <i className="bi bi-gear"></i>
                                </div>
                            </div>                                     
                            <div className="card-body d-flex flex-column ">                                                                                      
                                <div className="d-flex justify-content-center align-items-center mb-5">
                                    <h5 className="card-title">{userDetails?.nickname}</h5>
                                </div>
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <span className="icon-text"><i className="bi bi-envelope-fill"></i></span>
                                    <span className="text-value">{userDetails?.email}</span>
                                </div>
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <span className="icon-text"><i className="bi bi-geo-alt-fill"></i></span>
                                    <span className="text-value">{userDetails?.cep || 'CEP não informado'}</span>
                                </div>
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <span className="icon-text"><i className="bi bi-geo"></i></span>
                                    <span className="text-value">{userDetails?.cidade || 'Cidade não informado'}</span>
                                </div>
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <span className="icon-text"><i className="bi bi-geo-fill"></i></span>
                                    <span className="text-value">{userDetails?.estado || 'Estado não informado'}</span>
                                </div>
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <span className="icon-text"><i className="bi bi-globe-americas"></i></span>
                                    <span className="text-value">{userDetails?.pais || 'País não informado'}</span>
                                </div>
                                <div className="d-flex justify-content-center align-items-center">
                                    <i className="bi bi-chat-dots"></i>
                                </div>
                                <div className="d-flex justify-content-center align-items-center">                                    
                                    <p className="text-break">{userDetails?.bio || 'Bio não informado'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-9">
                        <div className="h2"><i className="bi bi-bookmark" style={{marginRight:"10px"}}></i>Minhas Listas</div>
                        <div className="row">
                            <div className="col">
                                <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Criar nova lista</button>
                            </div>
                        </div>                        
                        <div className="row mt-2">                            
                            {
                                list.map((content) => {
                                    return(
                                        <CardList
                                        key={content.id_lists}
                                        id={content.id_lists}
                                        name={content.name}
                                        created_at={content.created_at}
                                        />
                                    )
                                })
                            }                     
                        </div>                        
                    </div>                        
                </div>                
            </div>
            <ModalCadastroLista name={name} setName={setName} cadastrarLista={cadastrarLista} />
        </div>

        
    )
}

export default Perfil
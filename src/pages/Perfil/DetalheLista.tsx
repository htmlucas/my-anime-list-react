import axios from "axios"
import { useContext, useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AppContext } from "../../components/AppContext"
import '../../styles/detalheList.css';
import { format } from "date-fns";
import ModalUpdateLista from "../../components/List/ModalUpdateName";
import { Alert } from "../../services/alert";
import Swal from "sweetalert2";

interface Anime {
    id: string,
    title:string,
    description:string,
    img: string | null
}

interface List {
    id_lists: string,
    name:string,
    user_id:string,
    created_at: Date
}



const DetalhePerfil = () => {
    const [ list, setList ] = useState<List>()
    const [ name, setName ] = useState<string>('')
    const [ animeSearch, setAnimeSearch ] = useState<Anime[]>([])
    const [ search, setSearch ] = useState<String>('')
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [ anime, setAnime ] = useState<Anime[]>([])


    const { id } = useParams()
    const { isLoggedIn, setIsLoggedIn, user } = useContext(AppContext)
    const navigate = useNavigate()
    const url = 'http://localhost:5000/'
    const inputRef = useRef<HTMLInputElement>(null);
    const defaultImage = '/images/default.png';
    
    
    useEffect(() => {
        const inputElement = inputRef.current;
        if (!inputElement) return;
    
        const handleFocus = () => {
            setDropdownOpen(true);
        };
    
        const handleBlur = () => {
            setDropdownOpen(false);
        };
    
        inputElement.addEventListener('focus', handleFocus);
        inputElement.addEventListener('blur', handleBlur);
    
        return () => {
            inputElement.removeEventListener('focus', handleFocus);
            inputElement.removeEventListener('blur', handleBlur);
        };
    }, []);

    useEffect(() => {
        fetchData();
    },[])

    const fetchData = async () => {
        try{
            axios.get(url+'list/'+id)
            .then( (response) => {
                console.log(response.data)
                setList(response?.data.listDetails)            
                setAnime(response?.data.animesFromList) 
                
            })
            .catch ((error) => {
                console.log('entrou no error')

                console.log(error.response?.data.message)
            })
        } catch (error ) {
            console.log('erro')
        }
    }

    useEffect( () => {
        if(search){
            console.log('entrou no search',search)
            axios.post(url+'animes/search', {
                "titulo":search
            })
            .then( (response) => {
                console.log(response.data)
                setAnimeSearch(response.data)            
                
            })
            .catch ((error: any) => {
                console.log('entrou no error',error)
            })
        }else{
            setAnimeSearch([])
        }
    },[search])

    const perfil = async() => {
        if(isLoggedIn && user){
          const { id_user }  = JSON.parse(user)
          navigate('/perfil/'+id_user)
        }    
        
    }

    const verifySearchisInMyList = (id: string) => {
        if (!anime) {
            return false; // Retorna false se anime não estiver definido
        }
    
        return anime.some(content => content.id === id);
    };
    

    const addAnimetoList = async(anime_id: string) => {
        console.log('antes',anime)
        const formattedDate = format(new Date(), 'dd-MM-yyyy HH:mm:ss');
        await axios.post(url+'useranimelist/create',{
            "id_lists": id,
            "anime_id": anime_id,
            "date_add": formattedDate,
            "rating": 5
        })
        .then( (response) => {
            console.log('dentro do response de add anime to list',response)
            Alert('Sucesso!', 'Adicionado a lista com sucesso.','success')
            fetchData()

        })
        .catch( (error:any) => {
            console.log(error)
        })

        
    }
    console.log('depois',anime)

    const updateLista = async(id_lists: string, name:string) => {

        if(name.length <= 0 ){
            Alert('Erro!','O campo nome precisa ser preenchido','error')         
        }

        axios.patch(url+'list/name/update',{
            id_lists: id_lists,
            name: name,
        })
        .then( (response) => {
            if(response.data){
                console.log(response)
                Alert('Sucesso!', 'Lista atualizada com sucesso.','success')
                setList((prevList) => {
                    if (!prevList) {
                        return prevList; // Se prevList for undefined, retorna diretamente sem fazer alterações
                    }
                    return { ...prevList, name: name, id_lists: prevList.id_lists ?? '' };
                });
            }            
            setName('')
        })
        .catch ((error) => {
            console.log('entrou no error')
            Alert('Erro!',error.response.data.message,'error')
            console.log(error.response.data.message)
        })
        
    }

    const deleteLista = async(id_list: string) => {
        Swal.fire({
            title: "Deletar Lista",
            text: "Tem certeza que deseja deletar esta Lista? Esta ação não pode  ser revertida.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Deletar Lista"
          }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(url+'list/'+id_list)
                .then( (response) => {
                    if (response.data) {
                        let timerInterval: any;
                        Swal.fire({
                            title: "Excluido! Você será redirecionado em instantes...",
                            html: "Eu irei redirecionar em <b></b> milliseconds.",
                            timer: 5000,
                            timerProgressBar: true,
                            didOpen: () => {
                                Swal.showLoading();
                                const popup = Swal.getPopup();
                                if (popup) {
                                    const timer = popup.querySelector("b");
                                    if (timer) {
                                        timerInterval = setInterval(() => {
                                            timer.textContent = `${Swal.getTimerLeft()}`;
                                        }, 100);
                                    }
                                }
                            },
                            willClose: () => {
                                clearInterval(timerInterval);
                            }
                        }).then((result) => {
                            if (result.dismiss === Swal.DismissReason.timer) {
                                if(isLoggedIn && user){
                                    const { id_user }  = JSON.parse(user)
                                    navigate('/perfil/'+id_user)
                                } 
                            }
                        });
                    }
                                
                })
                .catch ((error) => {
                    console.log('entrou no error')
                    Alert('Erro!',error.response.data.message,'error')
                    console.log(error.response.data.message)
                })
            }
        });
    }

    const removeAnimefromList = async(id_anime: string) => {
        Swal.fire({
            title: "Remover Anime",
            text: "Tem certeza que deseja remover o anime desta Lista?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Remover Anime"
          }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(url+'useranimelist/'+id+'/'+id_anime)
                .then( (response) => {
                    console.log(response.data)
                    if (response.data) {
                        Alert('Sucesso!', 'Anime removido da lista com sucesso.','success')
                        fetchData()
                    }
                                
                })
                .catch ((error) => {
                    console.log('entrou no error')
                    Alert('Erro!',error.response.data.message,'error')
                    console.log(error.response.data.message)
                })
            }
        });

    }

    return (
        <>
        <div className="container">
                <div className="row mb-3">
                    <div className="col-12">
                        <p className="text-uppercase backtoPerfil" onClick={() => perfil()}>
                            <i className="bi bi-arrow-return-left" style={{marginRight: "10px"}} ></i>
                            Voltar ao perfil
                        </p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6 ">
                        <h2>{list?.name}</h2>                        
                    </div>
                </div>
                <div className="d-flex justify-content-between mb-2">
                    <div className="col-4 mb-3">
                        <div className="form-floating mb-3">
                            <input type="string"
                                className="form-control"
                                id="floatingInput"
                                placeholder="name@example.com"
                                onChange={(event) => setSearch(event.target.value)}
                                onFocus={() => setDropdownOpen(true)} // Adicionar a classe "show" ao dropdown quando o input receber foco
                                onBlur={() => setDropdownOpen(false)} // Remover a classe "show" do dropdown quando o input perder foco
                                ref={inputRef} 
                            />
                            <label htmlFor="floatingInput"><i className="bi bi-plus"></i>Adicionar série</label>
                        </div>
                    </div>
                    {dropdownOpen && (
                        <div className="search-dropdown">
                            <i className="bi bi-search"></i>
                            <p>Comece a digitar no campo de busca para encontrar uma série e adicioná-la à sua lista</p>                                
                        </div>
                    )}

                    <div className="dropdown" data-bs-theme="dark" data-bs-toggle="tooltip" data-bs-placement="right" title="Mais ações">
                        <button className="btn btn-primary p-3" id="dropdownOptionsCard" data-bs-toggle="dropdown" aria-expanded="false" >
                            <i className="bi bi-gear-fill" style={{marginRight: "10px"}}></i>
                            Configurações
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownOptionsCard">
                            <li><a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#updateListModal" >Renomear lista</a></li>
                            <li><a className="dropdown-item" href="#" onClick={ () => deleteLista(id!)}>Deletar lista</a></li>
                        </ul>
                    </div>
                </div>                
                <div className="row mt-2">
                        {
                            animeSearch && (
                                animeSearch.map((content) => {
                                    return (
                                        <div className="col-4 mb-3" key={content.id}>
                                            <div className="card mb-3 p-3 d-flex flex-row align-items-start justify-content-start" style={{ minHeight: '50px' }}>
                                                <img 
                                                    src={content.img ? '/images/' + content.img : defaultImage} 
                                                    className="img-fluid" 
                                                    alt="..." 
                                                    style={{ maxHeight: '100%', maxWidth: '150px', marginRight: '10px', borderRadius: '5px' }} 
                                                />
                                                <div className="card-body d-flex flex-column flex-grow-1">
                                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                                        <h5 className="card-title text-uppercase mb-0 mr-2">{content.title}</h5>
                                                        {verifySearchisInMyList(content.id) ? (
                                                            <i className="bi bi-trash3" style={{ cursor: "pointer" }} onClick={() => removeAnimefromList(content.id)}></i>
                                                        ) : (
                                                            <i className="bi bi-plus plus-button" onClick={() => addAnimetoList(content.id)}></i>
                                                        )}
                                                    </div>
                                                    <div className="d-flex justify-content-start" style={{ maxHeight: '150px', overflow: 'hidden' }}>
                                                        <p style={{ maxWidth: '200px', display: "-webkit-box", WebkitLineClamp: 5, WebkitBoxOrient: "vertical", overflow: "hidden", textOverflow: "ellipsis" }}>{content.description}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    )
                                })
                            )
                        }
                </div>
                <hr />
                <div className="row mt-2">
                {
                    anime && anime.length > 0 ? (
                        anime.map((content) => (
                            <div className="col-12" key={content.id}>
                                <div className="card mb-3 p-3 d-flex flex-row align-items-center" style={{ maxHeight: '250px' }}>
                                    <img 
                                        src={content.img ? '/images/' + content.img : defaultImage} 
                                        className="img-fluid" 
                                        alt="..." 
                                        style={{ maxHeight: '100%', maxWidth: '150px', marginRight: '10px', borderRadius: '5px' }} 
                                    />
                                    <div className="card-body d-flex flex-column">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <h5 className="card-title text-uppercase mb-0">{content.title}</h5>
                                            <i className="bi bi-trash3" style={{ cursor: "pointer" }} onClick={() => removeAnimefromList(content.id)}></i>
                                        </div>
                                        <div className="d-flex justify-content-start">
                                            <p className="text-break">{content.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        ))
                    ) : (
                        <div className="col-12">
                            <div className="card mb-3 p-3 border-dashed text-center justify-content-center" style={{minHeight:'250px'}}>
                                <i className="bi bi-tv" style={{fontSize:'3rem'}}></i>
                                Você pode adicionar itens a esta lista com a ferramenta de busca acima.
                            </div>
                        </div>
                    )
                }                    
                </div>
                <ModalUpdateLista id_lists={id!} name={name} setName={setName} updateLista={updateLista} />
            </div>
        </>
    )
}

export default DetalhePerfil
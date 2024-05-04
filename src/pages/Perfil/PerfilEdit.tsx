import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ViaCep } from "../../services/cep"
import { Alert } from "../../services/alert"
import InputMask from "react-input-mask"; // Importe o InputMask da biblioteca
import axios from "axios";
import { AppContext } from "../../components/AppContext";

const PerfilEdit: React.FC = () => {
    const { id } = useParams()
    const url = 'http://localhost:5000/'
    const [cep, setCep] = useState<string>(`''`)
    const [cidade, setCidade] = useState<string>('')
    const [estado, setEstado] = useState<string>('')
    const [pais, setPais] = useState<string>('')
    const [bio, setBio] = useState<string>('')    
    const token = localStorage.getItem('token');
    const { isLoggedIn, setIsLoggedIn, user } = useContext(AppContext)
    const navigate = useNavigate()

    useEffect( () => {
        axios.get(url+'user/'+id,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        .then( (response) => {
            setCep(response.data.cep);
            setCidade(response.data.cidade);
            setEstado(response.data.estado);
            setPais(response.data.pais);
            setBio(response.data.bio);
            
        })
        .catch ((error) => {
            console.log('entrou no error')
            console.log(error.response.data.message)
        })
    },[])

    useEffect(() => {
        const fetchAddress = async () => {
            console.log(cep)
            if(cep !== null){
                if (cep.replace(/\D/g, "").length === 8) {
                    const infoCep = await ViaCep(cep);
                    if (typeof infoCep === "object") {
                        setCidade(infoCep.localidade);
                        setEstado(infoCep.uf);
                        setPais("Brasil");
                    } else {
                        Alert("Atenção!","CEP incorreto ou não encontrado, tente novamente.","error");
                        clearInputs()
                    }
                }else{
                    clearInputs()
                }
            }
            
        };
    
        fetchAddress();
      }, [cep]);   
    

    const atualizarPerfil = (user_id?: string,cep?: string, cidade?:string, estado?: string, pais?: string, bio?:string) => {        

        axios.patch(url+'user/details/update',{
            user_id:user_id,
            cep:cep,
            cidade:cidade,
            estado:estado,
            pais:pais,
            bio:bio
        })
        .then( (response) => {
            Alert('Sucesso!', response.data.message,'success')
        })
        .catch ((error) => {
            console.log('entrou no error')
            Alert('Erro!',error.response.data.message,'error')
        })
    }

    const clearInputs = () => {
        setCidade("");
        setEstado("");
        setPais("");
    }

    const perfil = () => {
        if(isLoggedIn && user){
            const { id_user }  = JSON.parse(user)
            navigate('/perfil/'+id_user)
          }  
    }

    return (
        <div className="container">
            <p className="text-uppercase backtoPerfil" onClick={() => perfil()}>
                <i className="bi bi-arrow-return-left" style={{marginRight: "10px"}} ></i>
                Voltar ao perfil
                </p>
            <div className="row justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <div className="row align-items-center">
                                <div className="text-center mb-3">Lucas</div>
                                <div className="text-center mb-3">lucasmartinsde@gmail.com</div>
                                <div className="row mb-3">
                                    <label htmlFor="cep" className="col-sm-2 col-form-label">CEP</label>
                                    <div className="col-sm-10">                                        
                                    <InputMask
                                        mask="99999-999"
                                        maskChar={null} // Adiciona essa propriedade para evitar o uso indireto de findDOMNode
                                        className="form-control"
                                        value={cep}
                                        onChange={(event) => {
                                            setCep(event.target.value);
                                        }}
                                        id="cep"
                                        name="cep"
                                        type="text"
                                        placeholder="Digite o CEP"
                                    />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="city" className="col-sm-2 form-label">Cidade</label>
                                    <div className="col-sm-10">
                                        <input className="form-control" value={cidade} id="cidade" onChange={(event) => {setCidade(event.target.value) }} name="cidade" type="text" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="city" className="col-sm-2 form-label">Estado</label>
                                    <div className="col-sm-10">
                                        <input className="form-control" value={estado} id="estado" onChange={(event) => {setEstado(event.target.value) }} name="estado" type="text" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="city" className="col-sm-2 form-label">Pais</label>
                                    <div className="col-sm-10">
                                        <input className="form-control" value={pais} id="pais" disabled onChange={(event) => {setPais(event.target.value) }} name="pais" type="text" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="city" className="col-sm-2 form-label">Biografia</label>
                                    <div className="col-sm-10">
                                        <textarea className="form-control" value={bio} id="bio" onChange={(event) => {setBio(event.target.value) }} name="bio" placeholder="Digite a bio"></textarea>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <button type="button" className="btn btn-primary" onClick={() => atualizarPerfil(id,cep,cidade,estado,pais,bio)}>Atualizar informações</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default PerfilEdit
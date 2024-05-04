import { useContext, useState } from "react"
import { login } from "../services/login"
import { AppContext } from "../components/AppContext"
import { changeLocalStorage, createUserDetailsLocalStorage, createTokenUser } from "../services/storage"
import { useNavigate } from "react-router-dom"
import { Alert } from "../services/alert"


const Login = () => {
    const [ email, setEmail] = useState<string>('')
    const [ password, setPassword ] = useState<string>('')
    const { setIsLoggedIn } = useContext(AppContext)
    const navigate = useNavigate()

    const validateUser = async(email: string, password: string) => {
        const loggedIn = await login(email, password)    
        console.log('loggedIn',loggedIn)

        if(!loggedIn.login && loggedIn.error){
            Alert('Erro!','Email/Senha incorretos','error')
        }

        if(loggedIn.user){
            const { id_user } = loggedIn.user
            setIsLoggedIn(true)
            changeLocalStorage({ login: true})
            createUserDetailsLocalStorage(loggedIn.user)
            if (typeof loggedIn.token === 'string') {
                createTokenUser(loggedIn.token);
            }
            const perfilRoute = '/perfil/'+id_user
            navigate(perfilRoute)
        }       
       
    }
    

    return (
        <div className="container">
            <main className="form-signin w-100 m-auto">
            <div className="row justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <div className="row align-items-center">
                                <form>                
                                    <h1 className="text-center mb-4">Login</h1>

                                    <div className="form-floating mb-2">
                                        <input type="email" className="form-control" value={email} onChange={(event) => setEmail(event.target.value)}/>
                                        <label >Endereço de Email</label>
                                    </div>

                                    <div className="form-floating mb-4">
                                        <input type="password" className="form-control" value={password} onChange={(event) => setPassword(event.target.value)}/>
                                        <label >Senha</label>
                                    </div>
                                    <div className="d-flex flex-column justify-content-center align-items-center mb-4">
                                        <button className="btn btn-primary" type="button" onClick={() => validateUser(email,password)}>Entrar</button>                                    
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
            </div>
            </div>
                
            </main>
        </div>
    )
}

export default Login
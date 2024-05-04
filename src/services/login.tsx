import axios from "axios"

interface ILogin {
    login:boolean,
    token: string | null,
    user?: {
        id_user:string,
        img: string | null,
        nickname: string,
        email: string,
        password: string
    },
    error?: string
}


const url = 'http://localhost:5000/'

export const login = async(email:string, password:string): Promise<ILogin> => {

    const responseLogin: ILogin = {
        login:true,
        token: null,
    }
    
    await axios.post(url+'login',{
        email,
        password
    })
    .then( (response) => { 
        responseLogin.token = response.data.token
        responseLogin.user = response.data.user
    })
    .catch ((error: any) => {        
        responseLogin.error = error.response.data.message
    })    

    if(responseLogin.error){
        responseLogin.login = false
        return responseLogin
    }

    return responseLogin
}
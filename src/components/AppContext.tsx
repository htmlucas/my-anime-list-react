import { createContext, useEffect, useState } from "react"
import { getAllLocalStorage, getUserDetails,getUserToken } from "../services/storage"

interface IAppContext {
    user: string | null,
    isLoggedIn: boolean,
    setIsLoggedIn: (isLoggedIn: boolean) => void,
    token: string | null
}
  
export const AppContext = createContext({} as IAppContext)
  
export const AppContextProvider = ({ children }: any) => {
    const [ isLoggedIn, setIsLoggedIn ] = useState<boolean>(false)

    const storage = getAllLocalStorage()

    const user = getUserDetails()

    const token = getUserToken()

    useEffect(() => {
      if(storage){
        const { login } = JSON.parse(storage)
        setIsLoggedIn(login)
      }
    }, [])
  
    return (
      <AppContext.Provider value={{ user, isLoggedIn, setIsLoggedIn, token }}>
        { children }
      </AppContext.Provider>
    )
}

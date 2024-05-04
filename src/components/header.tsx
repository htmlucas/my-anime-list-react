import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "./AppContext";
import { changeLocalStorage } from "../services/storage";

interface UserData{
  email: string
  password: string
  nickname: string
  id_user: string,
  img: string | null
}

export const Header = () => {

  const [ userData, setUserData] = useState<UserData>()
  const { isLoggedIn, setIsLoggedIn, user } = useContext(AppContext)
  const navigate = useNavigate()
  
  const logout = () => {
    changeLocalStorage({login:false})
    setIsLoggedIn(false)
    navigate('/')
  }
  
  const perfil = async() => {
    console.log('user',user)
    console.log('isloggedin',isLoggedIn)
    if(isLoggedIn && user){
      const { id_user }  = JSON.parse(user)
      navigate('/perfil/'+id_user)
    }    
    
  }


    return (
      <header className="d-flex flex-wrap align-items-center justify-content-between py-3 mb-auto">
  <div className="container">
    <div className="d-flex align-items-center justify-content-between">
      <h3 className="mb-0">My Anime List</h3>
      
      <ul className="nav">
        <li><Link to="/" className="nav-link px-2 link-secondary">Inicio</Link></li>
        <li><Link to="/categorias" className="nav-link px-2">Categorias</Link></li>
      </ul>

      {isLoggedIn ? (
        <div className="dropdown">
          <a href="#" className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <i className="bi bi-person-circle" style={{ fontSize: '2rem' }}></i>
          </a>
          <ul className="dropdown-menu text-small">
            <li><a className="dropdown-item" href="#" onClick={() => perfil()}>Perfil</a></li>
            <li><Link className="dropdown-item" to="/cadastro/categorie">Cadastrar Categoria</Link></li>
            <li><Link className="dropdown-item" to="/cadastro/anime">Cadastrar Anime</Link></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item" href="#" onClick={() => logout()}>Sair</a></li>
          </ul>
        </div>
      ) : (
        <button className="btn btn-primary"><Link to="/login" className="nav-link">Login</Link></button>
      )}
    </div>
  </div>
</header>

    
    )
}

export default Header;
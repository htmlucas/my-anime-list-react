import { Route, Routes } from "react-router-dom"
import Home from "../pages/Home"
import Categorias from "../pages/Categorias"
import CategoriasDetails from "../pages/CategoriasDetails"
import Login from "../pages/Login"
import Perfil from "../pages/Perfil/Perfil"
import { useContext } from "react"
import { AppContext } from "../components/AppContext"
import CadastroAnimes from "../pages/CadastroAnime"
import CadastroCategorias from "../pages/CadastroCategoria"
import PerfilEdit from "../pages/Perfil/PerfilEdit"
import DetalheList from "../pages/Perfil/DetalheLista"
import AnimeDetails from "../pages/AnimeDetails"

const MainRoutes = () => {
    const { isLoggedIn} = useContext(AppContext)
    
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/anime/:id' element={<AnimeDetails />} />
            <Route path='/categorias' element={<Categorias />} />
            <Route path='/categoria/:id' element={<CategoriasDetails />} />
            <Route path='/login' element={<Login />} />
            <Route path='/cadastro/anime' element={<CadastroAnimes />} />
            <Route path='/cadastro/categorie' element={<CadastroCategorias />} />
            <Route path='/perfil/:id' element={ isLoggedIn ? <Perfil /> : <Home />} />
            <Route path='/perfil/edit/:id' element={ isLoggedIn ? <PerfilEdit /> : <Perfil />} />
            <Route path='/list/details/:id' element={ isLoggedIn? <DetalheList /> : <Perfil />} />

        </Routes>
    )
}

export default MainRoutes
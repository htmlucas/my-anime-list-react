interface IAnimeList {
    login: boolean;
}

const animeList = {
    login: false
}

interface IUser {
    id_user: string,
    img: string | null,
    nickname: string,
    email: string,
    password: string
}

export const getAllLocalStorage = (): string | null  => {
    return localStorage.getItem('auth')
}

export const createLocalStorage = (): void => {
    localStorage.setItem('auth', JSON.stringify(animeList))
}

export const changeLocalStorage = (animeList: IAnimeList): void => {
    localStorage.setItem('auth', JSON.stringify(animeList))
}

export const createUserDetailsLocalStorage = (User : IUser): void => {
    localStorage.setItem('user',JSON.stringify(User))
} 

export const createTokenUser = (token : string): void => {
    localStorage.setItem('token',token)
}

export const getUserToken = (): string | null => {
    return localStorage.getItem('token')
}

export const getUserDetails = (): string | null => {
    return localStorage.getItem('user')
}

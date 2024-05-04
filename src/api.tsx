const conta = {
    email: 'lucasmartinsde@gmail.com',
    password: '123',
    name: 'Lucas Martins',
    id: '1'
}

export const api = new Promise((resolve) => {
    setTimeout(() => {
        resolve(conta)
    }, 3000)
})
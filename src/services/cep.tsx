import axios from "axios"

interface ICep {
    bairro: string,
    cep: string,
    complemento: string,
    ddd: string,
    gia: string,
    ibge: string,
    localidade: string,
    logradouro: string,
    siafi: string,
    uf: string,
}

export const ViaCep = async (cep : string): Promise<ICep |  string> => {

    const url = 'https://viacep.com.br/ws/'
    const format = '/json'

    try{
        const response = await axios.get(url+cep+format)      
        const data = response.data  

        // Verifica se o retorno contém a propriedade erro
        if ("erro" in data && data.erro === true) {
            return "CEP não encontrado";
        }

        return data
    } catch (error ){
        console.log('error',error)
        return "Erro ao buscar o CEP";
    }
    

}
import { useState } from "react";

interface ModalUpdateListaProps {
    id_lists: string,
    name: string,
    setName: (value: string) => void,
    updateLista: (id_lists: string,name: string) => void, // Adicione essa propriedade se você precisa acessar a função updateLista no componente
  }

const ModalUpdateLista: React.FC<ModalUpdateListaProps> = ({ id_lists, name, setName, updateLista }) => {
    
    return (
        <div className="modal fade text-black" id="updateListModal" key={id_lists} tabIndex={-1} aria-labelledby="updateListModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="updateListModalLabel">Renomear Lista</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <form>
                    <div className="mb-3">
                        <label htmlFor="recipient-name" className="col-form-label">Nome da lista:</label>
                        <input type="text" className="form-control" name="name" value={name} onChange={ (event) => setName(event.target.value)} id="name"/>
                    </div>
                </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                    <button type="button" className="btn btn-primary" onClick={() => updateLista(id_lists, name)}>Renomear Lista</button>
                </div>
                </div>
            </div>
        </div>
    )

}

export default ModalUpdateLista;
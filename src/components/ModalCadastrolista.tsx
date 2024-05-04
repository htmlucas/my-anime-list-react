interface ModalCadastroListaProps {
    name: string;
    setName: (value: string) => void;
    cadastrarLista: (name: string) => void; // Adicione essa propriedade se você precisa acessar a função cadastrarLista no componente
  }

const ModalCadastroLista: React.FC<ModalCadastroListaProps> = ({ name, setName, cadastrarLista }) => {

    return (
        <div className="modal fade text-black" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Nova Lista</h1>
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
                    <button type="button" className="btn btn-primary" onClick={() => cadastrarLista(name)}>Salvar</button>
                </div>
                </div>
            </div>
        </div>
    )

}

export default ModalCadastroLista;
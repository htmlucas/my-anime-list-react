import { useNavigate } from 'react-router-dom';
import '../styles/cardList.css';
import { format } from 'date-fns';

interface iCardList {
    id:string,
    name: string,
    created_at: Date
}

export const CardList = ({ id,name,created_at}:iCardList) => {
    const navigate = useNavigate()  

    const createdAtDate = new Date(created_at);
    const formattedDate = format(createdAtDate, 'dd/MM/yyyy');

    const getListDetails = () => {
        navigate('/list/details/'+id)
    }

    return (
        <div className="col-4 mb-3" >
            <div className="card card-list mb-3 p-3" key={id} style={{minHeight:'50px',cursor:'pointer'}} onClick={() => getListDetails()}> 
                <div className="col-12">               
                        <div className="card-body d-flex flex-column">
                            <div className=" d-flex justify-content-between align-items-center">
                                <h5 className="card-title text-uppercase">{name}</h5>
                            </div>
                        </div>
                        <div className="row">
                            <p className=''>Criado em {formattedDate}</p>
                            
                        </div>
                </div>                                
            </div>
        </div>
    )
}
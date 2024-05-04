interface IAnime {
    id: string,
    title:string,
    img: string | null,
    description: string
}

interface iCard {
    anime: IAnime,
    getContent: (anime:IAnime) => void
}

export const Card: React.FC<iCard> = ({ anime, getContent})  => {

    const defaultImage = '/images/default.png';
    
    return (
        <div className="col-4">
            <div className="card mb-3" style={{ minHeight: "10px", cursor: "pointer" }} key={anime.id} onClick={() => getContent(anime)}>
                <img 
                src={defaultImage} 
                className="card-img-top img-fluid"
                alt="..."
                style={{ width: "100%", height: "auto" }}
                />
                <div className="card-body">
                <h5 className="card-title">{anime.title}</h5>
                <div className="col-12" style={{ maxHeight: "50px", overflow: "hidden" }}>                        
                    <span className="text-truncate text-break">{anime.description}</span>
                </div>                    
                </div>                               
            </div>
        </div>
    )
}
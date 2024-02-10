import { useNavigate } from "react-router-dom";
import { ReactComponent as Noposter } from '../icons/no_poster.svg';
import CircleRating from "../canvasComponents/CircleRating.js";
import prettyDate from '../functions/prettyDate.js';

const gen = {
    '12': 'Adventure',
    '14': 'Fantasy',
    '16': 'Animation',
    '18': 'Drama',
    '27': 'Horror',
    '28': 'Action',
    '35': 'Comedy',
    '36': 'History',
    '37': 'Western',
    '53': 'Thriller',
    '80': 'Crime',
    '99': 'Documentary',
    '878': 'Science Fiction',
    '9648': 'Mystery',
    '10402': 'Music',
    '10749': 'Romance',
    '10751': 'Family',
    '10752': 'War',
    '10759': 'Action & Adventure',
    '10762': 'Kids',
    '10763': 'News',
    '10764': 'Reality',
    '10765': 'Sci-Fi & Fantasy',
    '10766': 'Soap',
    '10767': 'Talk',
    '10768': 'War & Politics',
    '10770': 'TV Movie'
}

const Card = ({ data, mediaType }) => {
    const navigate = useNavigate();
    const handleClickCard = () => {
        navigate(`/detail/${mediaType}/${data.id}`);
    }
    
    return (
        <div className='relative w-32 md:w-48 h-auto flex flex-col flex-shrink-0 hover:animate-pulse cursor-pointer' onClick={handleClickCard}>
            {data.poster_path
                ? <img src={`https://image.tmdb.org/t/p/w300${data.poster_path}`} className="rounded-lg  h-48 md:h-72 object-cover" loading="lazy"></img>
                : <div className="w-full h-48 md:h-72 bg-slate-800 rounded-lg flex flex-col justify-center items-center"><Noposter height='96px' width='96px' /><p className="text-center text-sm md:text-base">No poster avaiable</p></div>}
            <div className="relative h-auto w-full flex flex-col text-sm md:text-base pt-8">
                <p className="font-bold">{data.title || data.name}</p>
                <p className="text-stone-500">{prettyDate(data.release_date) || prettyDate(data.first_air_date)}</p>
            </div>
            <div className="absolute top-[168px] md:top-[264px] left-0 h-auto w-full px-0 md:px-1 flex flex-row justify-between items-start">
                <div className="scale-75 md:scale-100"><CircleRating rate={data.vote_average} size={'48px'} /></div>
                <div className="flex flex-row justify-end flex-wrap gap-1 py-1 max-h-[52px] overflow-hidden">
                    {data.genre_ids?.map(id => <p key={id} className="text-sm bg-stone-300 opacity-70 text-black px-1 rounded-md max-w-20 md:max-w-none text-center text-ellipsis text-nowrap overflow-hidden">{gen[id]}</p>)}
                </div>
            </div>
        </div>
    )
}

export default Card;
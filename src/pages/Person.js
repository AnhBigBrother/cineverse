import { useParams } from "react-router-dom";
import useUpdateNavBtn from "../hook/useUpdateNavBtn";
import useFetch from "../hook/useFetch";
import { ReactComponent as Instagram} from '../icons/instagram.svg';
import { ReactComponent as Facebook} from '../icons/facebook-f.svg';
import { ReactComponent as Twitter} from '../icons/x-twitter.svg';
import { ReactComponent as Tiktok} from '../icons/tiktok.svg';
import { ReactComponent as Nobody_guy } from '../icons/nobody_guy.svg';
import { ReactComponent as Nobody_girl } from '../icons/nobody_girl.svg';



const Person = () => {
    useUpdateNavBtn('');
    const { id } = useParams();
    const [data, loading] = useFetch(`https://api.themoviedb.org/3/person/${id}?language=en-US`);
    const [social] = useFetch(`https://api.themoviedb.org/3/person/${id}/external_ids`);

    return (
        <div className="relative w-full">
            {!loading && <div className="relative w-full flex flex-col gap-3 p-10 lg:px-[10%]">
                <div className="relative w-full h-auto flex flex-col items-start gap-3 sm:flex-row justify-start sm:gap-5 md:gap-8">
                    {data.profile_path?<img src={`https://image.tmdb.org/t/p/w300/${data.profile_path}`} className="aspect-[2/3] object-cover h-auto w-full sm:w-64
                     rounded-lg" />:data.gender===1?<Nobody_girl className="aspect-[2/3] object-cover h-auto w-full sm:w-64
                     rounded-lg bg-slate-900"/>:<Nobody_guy className="aspect-[2/3] object-cover h-auto w-full sm:w-64
                     rounded-lg bg-slate-900"/>}
                    <div className="flex flex-col items-start h-auto overflow-hidden">
                        <p className="px-3 text-2xl md:text-3xl font-bold">{data.name}</p>
                        {social && (social.facebook_id || social.twitter_id || social.instagram_id || social.tiktok_id) && <div className="flex flex-row h-16 justify-start p-3 gap-3">
                            {social.facebook_id && <a href={`https://www.facebook.com/${social.facebook_id}`} target="_blank" rel='noopener noreferrer'><Facebook className='w-8 h-8 fill-white hover:scale-125 duration-300'/></a>}
                            {social.twitter_id && <a href={`https://twitter.com/${social.twitter_id}`} target="_blank" rel='noopener noreferrer'><Twitter className='w-8 h-8 fill-white hover:scale-125 duration-300'/></a>}
                            {social.instagram_id && <a href={`https://www.instagram.com/${social.instagram_id}`} target="_blank" rel='noopener noreferrer'><Instagram className='w-8 h-8 fill-white hover:scale-125 duration-300'/></a>}
                            {social.tiktok_id && <a href={`https://www.tiktok.com/@${social.tiktok_id}`} target="_blank" rel='noopener noreferrer'><Tiktok className='w-8 h-8 fill-white hover:scale-125 duration-300'/></a>}
                        </div>}
                        <p className="px-3 text-stone-300 text-lg"><span className="font-bold">Gender: </span><span>{data.gender === 1 ? 'Female' : 'Male'}</span></p>
                        <p className="px-3 text-stone-300 text-lg"><span className="font-bold">Known for: </span><span>{data.known_for_department ? data.known_for_department : '-'}</span></p>
                        <p className="px-3 text-stone-300 text-lg"><span className="font-bold">Birthday: </span><span>{data.birthday ? data.birthday : '-'}</span></p>
                        <p className="px-3 text-stone-300 text-lg"><span className="font-bold">Place of Birth: </span><span>{data.place_of_birth ? data.place_of_birth : '-'}</span></p>
                    </div>
                </div>
                <p className="text-justify text-stone-300">{data.biography}</p>
            </div>}
        </div>
    )
}

export default Person;
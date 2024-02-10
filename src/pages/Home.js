import { useState } from 'react';
import useFetch from '../hook/useFetch.js';
import RowCard from "../components/RowCard.js";
import useUpdateNavBtn from '../hook/useUpdateNavBtn.js';


const Home = () => {
    useUpdateNavBtn('home');

    const [duration, setDuration] = useState('day');
    const [popularMediaType, setPopularMediaType] = useState('movie');
    const [topRatedMediaType, setTopRatedMediaType] = useState('movie');

    const [trendingUrl, setTrendingUrl] = useState(`https://api.themoviedb.org/3/trending/all/${duration}?language=en-US`);
    const [popularUrl, setPopularUrl] = useState(`https://api.themoviedb.org/3/${popularMediaType}/popular?language=en-US&page=1`);
    const [topRatedUrl, setTopRatedUrl] = useState(`https://api.themoviedb.org/3/${topRatedMediaType}/top_rated?language=en-US&page=1`);

    const [trending, trendingLoad] = useFetch(trendingUrl);
    const [popular, popularLoad] = useFetch(popularUrl);
    const [topRated, topRatedLoad] = useFetch(topRatedUrl);

    const handleClickDurationBtn = () => {
        if (duration === 'day') {
            setDuration('week');
            setTrendingUrl(`https://api.themoviedb.org/3/trending/all/week?language=en-US`);
        }
        else {
            setDuration('day');
            setTrendingUrl(`https://api.themoviedb.org/3/trending/all/day?language=en-US`)
        }
    }
    const handleClickPopularMediaTypeBtn = () => {
        if (popularMediaType === 'movie') {
            setPopularMediaType('tv');
            setPopularUrl(`https://api.themoviedb.org/3/tv/popular?language=en-US&page=1`);
        }
        else {
            setPopularMediaType('movie');
            setPopularUrl(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`);
        }
    }
    const handleClickTopRatedMediaTypeBtn = () => {
        if (topRatedMediaType === 'movie') {
            setTopRatedMediaType('tv');
            setTopRatedUrl(`https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1`);
        }
        else {
            setTopRatedMediaType('movie');
            setTopRatedUrl(`https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1`);
        }
    }

    return (
        <div className="relative w-full h-full flex flex-col px-6 sm:px-8 md:px-12 py-5">
            <RowCard btnState={duration} handleClickStateBtn={handleClickDurationBtn} title={'Trending'} btnName1={'To day'} btnName2={'This week'} data={trending} loading={trendingLoad} />
            <RowCard btnState={popularMediaType} handleClickStateBtn={handleClickPopularMediaTypeBtn} title={"What 's popular ?"} btnName1={'Movie'} btnName2={'Tv show'} data={popular} loading={popularLoad} />
            <RowCard btnState={topRatedMediaType} handleClickStateBtn={handleClickTopRatedMediaTypeBtn} title={'Top Rated'} btnName1={'Movie'} btnName2={'Tv show'} data={topRated} loading={topRatedLoad} />
        </div>
    )
}

export default Home;
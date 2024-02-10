import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import updateNavBtn from '../redux/actions/updateNavBtn.js';
import SideNav from './SideNav';
import { ReactComponent as LogoName } from '../icons/logoName.svg';
import { ReactComponent as SearchIcon } from '../icons/search.svg';
import { ReactComponent as RotateLoading } from '../icons/arrows-rotate.svg';
import { GET } from '../API/APIconfig.js';
import SignIn from './SignIn.js';



const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [dropdownList, setDropdownList] = useState(<RotateLoading className='w-10 h-10 rounded-full bg-transparent fill-white animate-spin p-3' />);
    const [displayDropdown, setDisplayDropdown] = useState(false);
    const inp1 = useRef();
    const inp2 = useRef();

    // handle search bar
    useEffect(() => {
        if (query !== '') { setDisplayDropdown(true) }
        else { setDisplayDropdown(false) }
        setDropdownList(<RotateLoading className='w-10 h-10 rounded-full bg-transparent fill-white animate-spin p-2' />)
        const fetchRecommned = () => {
            fetch(`https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=en-US&page=1`, GET)
                .then(res => res.json())
                .then(data => {
                    let name = data.results.map((e) => e.name || e.title);
                    name = [...new Set(name)]
                    let index = 1;
                    name.length !== 0
                        ? setDropdownList(name.map((e, i) => i < 10 && <div className='w-full cursor-pointer hover:bg-stone-500 px-3 py-2 rounded-lg' key={'searchRecommend' + index++} onClick={() => handleClickDropdownItem(e)}>{e}</div>))
                        : setDropdownList(<p className='py-2 px-3'>Nothing found!</p>)
                })
                .catch((err) => { console.log(err) });
        }
        const timeOut = setTimeout(fetchRecommned, 500);
        if (query === '') { clearTimeout(timeOut) }
        return () => clearTimeout(timeOut);
    }, [query]);

    useEffect(() => {
        document.addEventListener('click', handleClickOutsideInputRecommends);
        return () => document.removeEventListener('click', handleClickOutsideInputRecommends);
    }, []);

    const handleClickOutsideInputRecommends = (e) => {
        if (inp1.current && !inp1.current.contains(e.target)) {
            setDisplayDropdown(false);
        }
        if (inp2.current && !inp2.current.contains(e.target)) {
            setDisplayDropdown(false);
        }
    }
    const handleClickSearch = () => {
        navigate('//search/' + query);
        setDisplayDropdown(false);
        const mobileSearchBar = document.getElementById('mobileSearchBar');
        const fog = document.getElementById('fog');
        if (mobileSearchBar.classList.contains('flex')) {
            mobileSearchBar.classList.toggle('hidden');
            mobileSearchBar.classList.toggle('flex');
        }
        if (fog.style.display === 'block') { fog.style.display = 'none' }
    }
    const handleClickDropdownItem = (str) => {
        setQuery(str);
        navigate('/search/' + str);
        const mobileSearchBar = document.getElementById('mobileSearchBar');
        const fog = document.getElementById('fog');
        if (mobileSearchBar.classList.contains('flex')) {
            mobileSearchBar.classList.toggle('hidden');
            mobileSearchBar.classList.toggle('flex');
        }
        if (fog.style.display === 'block') { fog.style.display = 'none' }
    }


    // handle mobile buttons
    const handleClickMobileBtn = () => {
        const sideNav = document.getElementById('sideNav');
        const mobileSearchBar = document.getElementById('mobileSearchBar');
        const fog = document.getElementById('fog');
        sideNav.classList.toggle('hidden');
        sideNav.classList.toggle('flex');
        if (mobileSearchBar.classList.contains('flex')) {
            mobileSearchBar.classList.toggle('hidden');
            mobileSearchBar.classList.toggle('flex');
        }
        if (mobileSearchBar.classList.contains('flex') || sideNav.classList.contains('flex')) {
            fog.style.display = 'block';
        }
        else {
            fog.style.display = 'none';
        }
    }
    const handleClickMobileSearchBtn = () => {
        const mobileSearchBar = document.getElementById('mobileSearchBar');
        const sideNav = document.getElementById('sideNav');
        const fog = document.getElementById('fog');
        mobileSearchBar.classList.toggle('hidden');
        mobileSearchBar.classList.toggle('flex');
        if (sideNav.classList.contains('flex')) {
            sideNav.classList.toggle('hidden');
            sideNav.classList.toggle('flex');
        }
        if (mobileSearchBar.classList.contains('flex') || sideNav.classList.contains('flex')) {
            fog.style.display = 'block';
        }
        else {
            fog.style.display = 'none';
        }
    }

    return (
        <header className="fixed top-0 w-full h-14 px-1 sm:px-3 flex flex-row justify-between items-center bg-black z-40">
            <span id='mobileSearchBar' className='absolute top-14 left-0 px-2 w-full h-12 hidden lg:hidden bg-transparent flex-row'>
                <input className='h-full w-full bg-movie-theater px-3 outline-0 border border-stone-600 focus:border-amber-300 rounded-l-lg' placeholder='Search' value={query} onChange={event => setQuery(event.target.value)} onKeyDown={(e) => { e.key === 'Enter' && handleClickSearch() }}></input>
                <button className='h-full bg-stone-800 px-3 border border-stone-600 hover:border-amber-300 rounded-r-lg' onClick={handleClickSearch}><SearchIcon fill="#fde047d9" /></button>
                {displayDropdown && <div ref={inp2} className='absolute w-[98%] mx-[1%] z-20 top-14 rounded-lg left-0 h-auto bg-neutral-800 flex flex-col justify-start'>{dropdownList}</div>}
            </span>
            <SideNav />
            <span className='relative w-auto h-full flex flex-row gap-0 md:gap-2 items-center'>
                <button className='relative w-10 h-10 text-2xl rounded-full hover:bg-stone-800 lg:hidden' onClick={handleClickMobileBtn}>&#9776;</button>
                <button onClick={() => { dispatch(updateNavBtn('home')); navigate('/home') }}><LogoName fill='#ffffff' /></button>
            </span>
            <span className='relative h-10 w-2/5 hidden flex-row lg:flex'>
                <input className='relative h-full w-full rounded-l-full px-5 bg-movie-theater border border-stone-800 outline-0 focus:border-amber-300' placeholder='Search' value={query} onChange={event => setQuery(event.target.value)} onKeyDown={(e) => { e.key === 'Enter' && handleClickSearch() }}></input>
                <button className='relative h-full w-16 rounded-r-full flex justify-center items-center bg-stone-800 border-amber-300 hover:border' onClick={handleClickSearch}><SearchIcon fill="#fde047d9" /></button>
                {displayDropdown && <div ref={inp1} className='absolute w-full z-20 top-12 rounded-lg left-0 h-auto bg-neutral-800 flex flex-col justify-start'>{dropdownList}</div>}
            </span>
            <span className='relative w-auto h-full flex flex-row gap-1 sm:gap-2 items-center'>
                <button className='relative h-10 w-10 rounded-full lg:hidden hover:bg-stone-800 flex justify-center items-center' onClick={handleClickMobileSearchBtn}><SearchIcon fill="#ffffff" /></button>
                <SignIn />
            </span>
        </header>
    )
}

export default Header;
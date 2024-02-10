import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header.js';
import Home from './pages/Home.js';
import Movie from './pages/Movie.js';
import Tv from './pages/Tv.js';
import People from './pages/People.js';
import Detail from './pages/Detail.js';
import Person from './pages/Person.js';
import SearchResults from './pages/SearchResults.js';
import Favorite from './pages/Favorite.js';
import Rated from './pages/Rated.js';
import ScrollToTop from './components/ScrollToTop.js';



function App() {
  const handleClickFog = () => {
    const sideNav = document.getElementById('sideNav');
    const mobileSearchBar = document.getElementById('mobileSearchBar');
    const fog = document.getElementById('fog');
    if (mobileSearchBar.classList.contains('flex')) {
      mobileSearchBar.classList.toggle('hidden');
      mobileSearchBar.classList.toggle('flex');
    }
    if (sideNav.classList.contains('flex')) {
      sideNav.classList.toggle('hidden');
      sideNav.classList.toggle('flex');
    }
    fog.style.display = 'none';
  }
  return (
    <div className="relative w-full font-sans text-white bg-movie-theater flex min-h-screen">
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <div id='bodyPage' className='relative pt-14 lg:pl-60 w-full h-full'>
          <div id='fog' className='fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-30' style={{ display: 'none' }} onClick={handleClickFog}></div>
          <Routes>
            <Route index element={<Home />}></Route>
            <Route path='/home' element={<Home />}></Route>
            <Route path='/movie' element={<Movie />}></Route>
            <Route path='/tv' element={<Tv />}></Route>
            <Route path='/detail/:mediaType/:id' element={<Detail />}></Route>
            <Route path='/people' element={<People />}></Route>
            <Route path='/favorite' element={<Favorite />}></Route>
            <Route path='/rated' element={<Rated />}></Route>
            <Route path='/person/:id' element={<Person />}></Route>
            <Route path='/search/:query' element={<SearchResults />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

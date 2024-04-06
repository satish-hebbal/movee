import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './moveeCard'
import FavCard from './favMovieCard'
import Nav from './moveeNav'
import DetailBox from './details.jsx'

function App() {
  // const [count, setCount] = useState(0)
  const [movies, setMovies] = useState([])
  const[search, setSeacrh] = useState('john wick')
  const[favs, setFavs] = useState([])
  const [isDetailBoxOpen, setIsDetailBoxOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleOpenDetailBox = (movie) => {
    setSelectedMovie(movie);
    setIsDetailBoxOpen(true);
  };

  const handleCloseDetailBox = () => {
    setIsDetailBoxOpen(false);
  };
  
  const handleSearch=(e)=>{
    setSeacrh(e.target.value)
  }


  const  getMovies= async (search)=>{
      const url = `https://www.omdbapi.com/?s=${search}&apikey=69017a0d`
      const response = await fetch(url)
      const respJson = await response.json()

      if(respJson.Search){
        setMovies(respJson.Search)
      }
  }
  
  useEffect(()=>{
    getMovies(search)
  },[search])

  useEffect(()=>{
    const favMovies = JSON.parse(
      localStorage.getItem('favorite')
    )
    setFavs(favMovies)
  },[])

  const saveToLocal=(favsList)=>{
    localStorage.setItem('favorite',JSON.stringify(favsList))
  }

  const addToFav=(movie)=>{
    if(favs.includes(movie)){
      console.log("already added!")
    }
    else{
      const favMovies = [...favs, movie]
      setFavs(favMovies)
      saveToLocal(favMovies)
      // console.log(favMovies)
    }
  }

  const removeFav=(movId)=>{
    const removedFavList = favs.filter(movie => movie.imdbID !== movId)
    setFavs(removedFavList)
  }




  return (
    <>
      <Nav handleSearch={handleSearch}/>
      
      {isDetailBoxOpen && <DetailBox movie={selectedMovie} onClose={handleCloseDetailBox} />}

      <h1 className='font-mono'>namaste</h1>
      
  

      <div className="flex overflow-x-scroll pb-10 no-scrollbar" >
        <div className="flex flex-nowrap gap-4 lg:ml-20 md:ml-10 ml-10 py-10">
        {
           movies.map((movie) => (
            <div key={movie.imdbID}>
              <Card addFav={addToFav} onOpenDetailBox={handleOpenDetailBox} movieObj={movie} poster={movie.Poster} title={movie.Title} movieId={movie.imdbID} />
              <h1 className='text-white'>{movie.imdbID}</h1>
            </div>
           ))
           
        }  
        
        </div>
        </div>
        <h2 className='text-white ml-20'>Favs</h2>
        <div className="flex overflow-x-scroll pb-10 no-scrollbar" >
        <div className="flex flex-nowrap gap-4 lg:ml-20 md:ml-10 ml-10 py-10">
        {
          favs.map((fav) => (
            <div key={fav.imdbID}>
              <FavCard remove={removeFav} onOpenDetailBox={handleOpenDetailBox} movieObj={fav} poster={fav.Poster} title={fav.Title} movieId={fav.imdbID} />
            </div>
          ))
        }
   
        </div>
        </div>
    </>
  )
}

export default App

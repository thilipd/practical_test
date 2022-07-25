import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from './navbar/Navbar';
import CreateMovie from './componenets/CraeteMovie';
import ListMovies from './componenets/ListMovies';
import EditMovies from './componenets/EditMovies'
import { useSelector } from 'react-redux'

function App() {

  const [movies, setMovies] = useState([]);

  const moviesStore = useSelector(state => state.movies);
  useEffect(() => {
    if (moviesStore) {
      setMovies(moviesStore);
    }
  }, [])


  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <ToastContainer />
        <Routes>
          <Route path='/' element={<CreateMovie movies={movies} setMovies={setMovies} />} />
          <Route path='/dashboard' element={<ListMovies />} />
          <Route path='/movie/:name' element={<EditMovies movies={movies} setMovies={setMovies} />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;

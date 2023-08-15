import { useState, useEffect } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';

function App() {
  const [personajes, setPersonajes] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [filmsPerPage] = useState(4)


  useEffect(() => {
    const TS = process.env.REACT_APP_TS;
    const API_KEY = process.env.REACT_APP_API_KEY;
    const HASH = process.env.REACT_APP_HASH;

    const baseURL = `https://gateway.marvel.com/v1/public/comics?ts=${TS}&apikey=${API_KEY}&hash=${HASH}`

    fetch(baseURL)
    .then(response => response.json())
    .then(data => setPersonajes(data.data.results))
    setLoading(false)
  },[])

  //pagination
  const indexOfLastFilm = currentPage * filmsPerPage;
  const indexOfFirstFilm = indexOfLastFilm - filmsPerPage;
  const paginar = personajes.slice(indexOfFirstFilm, indexOfLastFilm);

  //Change page
  const paginate = pageNumber => setCurrentPage(pageNumber)

  return (
    <div className="container">
      <p className="text-center mb-4" style={{fontSize: "30px"}}>Api Marvel</p>
      {loading ? (
        <div style={{color: "red"}}>Loading...</div>
      ) : (
        <>
        <div className='col-12' style={{height: "100%", marginBottom: "0px"}}>
        <div className="row row-cols-1 row-cols-md-4 g-1">
        {paginar.map((per) => (
          <div className="col-12 mt-2 d-flex justify-content-center" key={per.id}>
            <div className="card" style={{width: "90%", height: "350px"}}>
              <div className='text-center p-2' style={{width: "auto", height: "200px", margin: "auto"}}>
                <img src={`${per.thumbnail.path}.${per.thumbnail.extension}`} className="card-img-top img-fluid" alt="..." style={{width: "auto", height: "90%", borderRadius: "10px"}}/>
              </div>
              <div className="card-body text-center">
                <div className="card-title">{per.title}</div>
                <p className="card-text" style={{color: "gray"}}>ver más</p>
              </div>
            </div>
          </div>
        ))}  
        </div>
          
        </div> 
          <div className='d-flex justify-content-center mt-2'>
            <Pagination filmsPerPage={filmsPerPage} totalFilms={personajes.length} paginate={paginate}/>
          </div>
        </>
      )}
         
    </div>
  );

}

export default App;

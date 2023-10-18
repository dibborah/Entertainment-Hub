import React, { useEffect, useState } from 'react'
import axios from "axios"
import SingleContent from '../../components/SingleContent/SingleContent'
import CustomPagination from '../../components/Pagination/CustomPagination'
import "./Movies.css"  
import Genres from '../../components/Genres'

const Movies = () => {

  const [page, setPage] = useState(1)
  const [content, setContent] = useState([])
  const [numOfpages, setNumOfpages] = useState()
  const [selectedGenres, setSelectedGenres] = useState([])
  const [genres, setGenres] = useState([])

  const fetchMovies = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=5efa4b075d423dc33f2099d2166c935c&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`
      );

      console.log(data,"Movies");

    setContent(data.results)
    setNumOfpages(data.total_pages);
  }

  useEffect(() => {
    fetchMovies();
  }, [page])

  return (
    <div>
      <span className="pageTitle">Movies </span>
    <div>
    <Genres
      type="movie"
      selectedGenres={selectedGenres}
      genres={genres}
      setGenres={setGenres}
      setPage={setPage}

      />
    </div>
      <div className="movies">
        {
          content && content?.map((c) =>
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type='movie'
              vote_average={c.vote_average}
            />
          )
        }
      </div>
      {numOfpages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfpages} />
      )}
    </div>
  )
}

export default Movies
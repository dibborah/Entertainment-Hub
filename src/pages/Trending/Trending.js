import React, { useEffect, useState } from 'react'
import axios from 'axios'
import SingleContent from '../../components/SingleContent/SingleContent';
import "./Trending.css"
import CustomPagination from '../../components/Pagination/CustomPagination';

const Trending = () => {

  const [page, setPage] = useState(1)
  const [content, setContent] = useState([]);

  const fetchTrending = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=c32663019008063dd684369ae3359ed2&page=${page}`);

    // console.log(data.results, "data");
    setContent(data.results);
  };

  useEffect(() => {
    fetchTrending();
  }, [page])

  return (
    <div>
      <span className="pageTitle">Trending</span>
      <div className="trending">
        {
          content && content.map((c) =>
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={c.media_type}
              vote_average={c.vote_average}
            />
          )
        }
      </div>
      <CustomPagination setPage={setPage} />
    </div>
  )
}

export default Trending


// API Key:
// c32663019008063dd684369ae3359ed2

// API Read Access Token:
// eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMzI2NjMwMTkwMDgwNjNkZDY4NDM2OWFlMzM1OWVkMiIsInN1YiI6IjY1MmU5NzYyYTgwMjM2MDBmZDJjZjc1YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.f8pgCaAm3lqlZJ3o7tMibFMnqggcYZHvIOIpOZmF18k
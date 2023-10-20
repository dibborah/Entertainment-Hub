import { useEffect, useState } from 'react'
import axios from 'axios';
import SingleContent from '../../components/SingleContent/SingleContent';
import CustomPagination from '../../components/Pagination/CustomPagination';
import "./Series.css"

const Series = () => {

  const [page, setPage] = useState(1);
  const [content, setContent] = useState([])
  const [numOfPages, setNumOfPages] = useState()

  const fetchSeries = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=5efa4b075d423dc33f2099d2166c935c&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`);

    setContent(data.results);
    // setNumOfpages(data.total_pages);
    setNumOfPages(data.total_pages);
  }

  useEffect(() => {
    fetchSeries();
  }, [page])

  return (
    <div>
      <span className="pageTitle">Series</span>
      <div className="tvSeries">
        {
          content && content?.map((c) =>
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type='tv'
              vote_average={c.vote_average}
            />
          )
        }

        {/* This code below (the pagination) is not working */}
        {numOfPages > 1 && (
          <CustomPagination setPage={setPage} numOfPages={numOfPages} />
        )}
      </div>
    </div>
  )
}

export default Series
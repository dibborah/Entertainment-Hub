import React from 'react'
import axios from "axios"
import { useEffect } from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

const Genres = ({
    type,
    selectedGenres,
    setSelectedGenres,
    genres,
    setGenres,
    setPage,
}) => {
    const fetchGenres = async () => {

        const { data } = await axios.get(
            `https://api.themoviedb.org/3/genre/${type}/list?api_key=c32663019008063dd684369ae3359ed2&language=en-US`
        );
        console.log(data.genres, "Genres")
        setGenres(data.genres);
    };

    // console.log(genres);

    useEffect(() => {
        fetchGenres();

        return () => {
            //Unmounting and returning the API
            setGenres({})
        }
    }, [])

    return (
        <div style={{ padding: "6px 0" }}>
            {genres?.map((genre) => (<h1>{genre?.name}</h1>))}
    </div>
    )
}

export default Genres 
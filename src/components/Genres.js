import React from 'react'
import axios from "axios"
import { useEffect } from 'react';
// import { MuiChip } from './Chip';
import { Stack, Chip } from "@mui/material"
// import Chip from '@mui/material/Chip';
// import Stack from '@mui/material/Stack';

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

    useEffect(() => {
    
    }, [genres])
    

    // console.log(genres);

    useEffect(() => {
        fetchGenres();

        return () => {
            //Unmounting and returning the API
            setGenres({})
        }
    }, [])

    return (
        <>
            {
                genres?.map((genre) => (
                    <h1 key={genre?.id}>{genre?.name}</h1>
                ))}
            {/* {genres && 
            genres.map((g)=>(
                <Chip 
                label={g.name}
                style={{margin:2}} 
                size='small' 
                key={g.id}
                clickable
                 />
            ))} */}
        </>
    )
}

export default Genres 
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import axios from "axios";
import { useState, useEffect } from 'react';
import { img_500, unavailable, unavailableLandscape } from '../../config/config';
import YouTubeIcon from '@mui/icons-material/YouTube';
import "./ContentModal.css"
import Carousel from "./Carousel/Carousel"
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/material';
import { createTheme } from '@mui/material';
// import { makeStyles } from '@mui/styles/';

// const theme = createTheme()

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "90%",
    height: "80%",
    bgcolor: 'background.paper',
    backgroundColor: '#39445a',
    border: '1px solid #282c34',
    boxShadow: 24,
    p: (1, 1, 3),
    color: "white"
    //   p: 4,
};

// const useStyles = makeStyles((theme) = ({

//     modal: {
//         display: "flex",
//         alignItems: "center",
//         justifyContent : "center"
//     },
//     paper:{
//         width: "90%",
//         height: "80%",
//         backgroundColor: "#39445a",
//         border: "1px solid #282c34",
//         borderRadius : 10,
//         color:"white",
//         boxShadow: theme.shadows[5],
//         padding: theme.spacing(1,1,3),
//     }
// }))

//Why putting children displayed the Movie cards 
export default function ContentModal({ children, media_type, id }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [content, setContent] = useState()
    const [video, setVideo] = useState()
    // const classes = useStyles();

    const fetchData = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=5efa4b075d423dc33f2099d2166c935c&language=en-US`)

        setContent(data);
    }

    const fetchVideo = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=5efa4b075d423dc33f2099d2166c935c&language=en-US`)

        console.log(data);
        setVideo(data.results[0]?.key);
    }

    useEffect(() => {
        fetchData();
        fetchVideo();
    }, [])

    return (
        <>
            {/* <Button  className='media' onClick={handleOpen}>Open modal</Button> */}
            <div
            className='media' 
            onClick={handleOpen}
            >
            {children}
            </div>
            {/* Why putting children displayed the Movie cards  */}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                // className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    {/* {content && (<Box className="classes.paper"> */}
                    {content && (<Box sx={style} >
                        <div className="ContentModal">
                            <img
                                alt={content.name || content.title}
                                className='ContentModal_portrait'
                                src={content.poster_path
                                    ? `${img_500}/${content.poster_path}`
                                    : unavailable}
                            />
                            <img
                                src={content.backdrop_path
                                    ? `${img_500}/${content.backdrop_path}`
                                    : unavailableLandscape
                                }
                                alt={content.name || content.title}
                                className='ContentModal_landscape'
                            />
                            <div className="ContentModal_about">
                                <span className="ContentModal_title">
                                    {content.name || content.title} (
                                    {(
                                        content.first_air_date ||
                                        content.release_date ||
                                        "-----"
                                    ).substring(0, 4)}
                                    )
                                </span>
                                {content.tagline && (
                                    <i className='tagline'>{content.tagline}</i>
                                )}
                                <span className='ContentModal_description'>
                                    {content.overview}
                                </span>
                                <div>
                                    <Carousel media_type={media_type} id={id}/>
                                </div>
                                <Button
                                    style={{ backgroundColor: "red", padding: "0 9px", borderRadius: "4px" }}
                                    variant="contained"
                                    startIcon={<YouTubeIcon />}
                                    color="secondary"
                                    target="_blank"
                                    href={`https://www.youtube.com/watch?v=${video}`}
                                >
                                    Watch the Trailer
                                </Button>
                            </div>
                        </div>
                        {/* <Typography id="transition-modal-title" variant="h6" component="h2">
                                Text in a modal
                        </Typography>
                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                        </Typography> */}

                    </Box>)}
                </Fade>
            </Modal>
        </>
    );
}

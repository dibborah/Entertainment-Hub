// import Pagination from '@mui/material/Pagination';
// import { PaginationItem } from '@material-ui/lab';

import React from 'react'
import {Pagination} from '@material-ui/lab'
import { ThemeProvider, createTheme } from '@mui/material';

const darkTheme = createTheme({
    palette: {
        type: "dark",
    },
});

const CustomPagination = ({ setPage, numOfPages = 10 }) => {

    const handlePageChange = (page) => {
        setPage(page);
        window.scroll(0, 0);
    }
    
    return (
        <div>
            <ThemeProvider theme={darkTheme}>
                <Pagination
                    count={numOfPages}
                    onChange={(e) => handlePageChange(e.target.textContent)} 
                    hideNextButton
                    hidePrevButton
                    color='primary'
                />
            </ThemeProvider>
        </div>
    )
}

export default CustomPagination 
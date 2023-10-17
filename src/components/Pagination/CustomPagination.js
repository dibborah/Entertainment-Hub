// import { Pagination } from '@mui/material'
import React from 'react'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const CustomPagination = ({ setPage, numOfPages = 10 }) => {

    const handlePageChange = (page) => {
        setPage(page);
        window.scroll(0, 0);
    }
    return (
        <div>
            <Pagination count={numOfPages}
                onChange={(e) => handlePageChange(e.target.textContent)} />
        </div>
    )
}

export default CustomPagination 
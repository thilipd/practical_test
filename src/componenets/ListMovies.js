import React, { useEffect, useState } from 'react';
import axios from '../axios/axios';
import { toast } from 'react-toastify';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { dispatchMovies } from '../redux/action/movie';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.info.main,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.primay,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


const ListMovies = () => {


    const [load, setLoad] = useState(false)

    const [movies, setMovies] = useState([])

    const navigate = useNavigate();

    const moviesStore = useSelector(state => state.movies);


    const dispatch = useDispatch();

    const handleEdit = (name) => {
        navigate(`/movie/${name}`)
    }
    const handleDelete = async (name) => {

        setLoad(true)
        movies.forEach((obj, i) => {
            if (obj.movieName === name) {
                movies.splice(i, 1);
            }
        })
        setLoad(false)

        dispatch(dispatchMovies(movies));

    }

    const fetchMovies = async () => {

        await axios.get('/posts')
            .then((res) => {
                setMovies(moviesStore);
            })
            .catch((err) => {
                toast.error(err.message);
            })

    }

    useEffect(() => {

        fetchMovies();
    }, []);

    console.log(movies)

    return (

        load ? <></> :
            <>
                <div className='p-5'>

                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Movie</StyledTableCell>
                                    <StyledTableCell align="right">Cast</StyledTableCell>
                                    <StyledTableCell align="right">Gener</StyledTableCell>
                                    <StyledTableCell align="right">Rating</StyledTableCell>
                                    <StyledTableCell align="right">Release</StyledTableCell>
                                    <StyledTableCell align="right">Edit</StyledTableCell>
                                    <StyledTableCell align="right">Delete</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {movies && movies.map((row, i) => (
                                    <StyledTableRow key={i + 1}>
                                        <StyledTableCell component="th" scope="row">
                                            {row.movieName}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">{
                                            row.cast && row.cast.map((c) => <span>{c},</span>)
                                        }</StyledTableCell>
                                        <StyledTableCell align="right">{row.gener}</StyledTableCell>
                                        <StyledTableCell align="right">{row.rating}</StyledTableCell>
                                        <StyledTableCell align="right">{row.release}</StyledTableCell>
                                        <StyledTableCell align="right"><EditIcon color={'primary'} onClick={() => handleEdit(row.movieName)} /></StyledTableCell>
                                        <StyledTableCell align="right"><DeleteIcon color={'error'} onClick={() => handleDelete(row.movieName)} /></StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </div>
            </>

    )
}

export default ListMovies

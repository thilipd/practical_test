import React, { useEffect, useState } from 'react'
import ReactChipInput from "react-chip-input";
import { Paper } from '@mui/material';
import axios from '../axios/axios';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { dispatchMovies } from '../redux/action/movie';



const intailaValue = {
    movieName: '',
    cast: [],
    gener: '',
    release: '',
    rating: 0
}

const CreateMovie = ({ movies, setMovies }) => {

    const [chips, setChips] = useState([]);

    const [load, setLoad] = useState(false);



    const [movieDetails, setMovieDetails] = useState(intailaValue);

    const { movieName, gener, release, rating } = movieDetails;

    const dispatch = useDispatch();

    const handleChange = (e) => {

        const { value, name } = e.target;
        setMovieDetails({ ...movieDetails, [name]: value });

    }



    const handleSubmit = (e) => {
        e.preventDefault();

        for (let value in movieDetails) {
            if (!movieDetails[value]) return toast.error(`${value} is missing, Please fill missing feild`);
        }

        setLoad(true)
        axios.post('/posts', {
            method: 'POST',
            body: {
                ...movieDetails
            },
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((res) => {
                toast.success(`${res.data.body.movieName} has been created successfully`)
                setLoad(false);
                setMovies([...movies, res.data.body])


            })
            .catch((err) => {
                toast.error(err.message);
                console.log(err)
                setLoad(false)
            })

        setMovieDetails(intailaValue);
        setChips([])

    }


    const addChip = (chip) => {

        setChips([...chips, chip])
        setMovieDetails({ ...movieDetails, cast: [...chips, chip] })
    }

    const removeChip = (i) => {

        chips.splice(i, 1);
        setMovieDetails({ ...movieDetails, cast: [...chips] })

    }

    useEffect(() => {
        if (movies.length) {
            dispatch(dispatchMovies(movies));
        }

    }, [movies, dispatch])


    return (
        load ?
            <>
            </> :
            <>
                <div className='d-flex  align-items-start justify-content-center p-5  movieContainer'>
                    <Paper elevation={3} className='paper p-3'>
                        <h2>Create Movie</h2>
                        <label>
                            <div className="lableContainer">
                                Cast:
                            </div>
                            <div className="inputContainer" style={{ width: '300px' }}>
                                <ReactChipInput
                                    className="castChip"
                                    chips={chips}
                                    onSubmit={(value) => addChip(value)}
                                    onRemove={index => removeChip(index)}
                                />
                                <h6>Please hit enter key on the above field to add cast members</h6>
                            </div>
                        </label><br />
                        <form onSubmit={(e) => handleSubmit(e)} className="col registerForm">
                            <label>
                                <div className="lableContainer">
                                    Movie:
                                </div>
                                <div className="inputContainer">
                                    <input type="text"
                                        name='movieName'
                                        value={movieName}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                            </label><br /><br />


                            <label>
                                <div className="lableContainer">
                                    Gener
                                </div>
                                <div className="inputContainer">
                                    <input type="text"
                                        name='gener'
                                        value={gener}
                                        onChange={(e) => handleChange(e)}

                                    />
                                </div>
                            </label><br /><br />
                            <label>
                                <div className="lableContainer">
                                    Rating:
                                </div>
                                <div className="inputContainer">
                                    <input type="number"
                                        max={10}
                                        name='rating'
                                        value={rating}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                            </label><br /><br />

                            <label>
                                <div className="lableContainer">
                                    Release:
                                </div>
                                <div className="inputContainer">
                                    <input type="date"
                                        name='release'
                                        value={release}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                            </label><br /><br />
                            <div className='d-flex justify-content-center'>
                                <input className='btn btn-primary ' type="submit" value="Submit" />
                            </div>
                        </form><br /><br />

                        <label>

                        </label><br /><br />
                    </Paper >

                </div>
            </>

    )
}

export default CreateMovie


import { useEffect, type FC } from 'react'
import { Link, useLoaderData } from 'react-router-dom';
// import type { MovieType } from '../../models/movie-model';
import MovieDetail from '../../fragments/MovieDetail';
import type { ResponseType } from '../../types/types';
import type { MovieResponseType } from '../../models/movie-model';

const AdminMovieDetailPage: FC = () => {
    // data 
    const movie = useLoaderData() as ResponseType<MovieResponseType | null>;


    // cek data 
    useEffect(() => {
        if (movie) {
            console.log(movie)
        }
    }, [movie])



    // scrol top
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])


    return (
        <div className='w-full min-h-screen flex flex-col justify-start items-center relative'>
            {/* detail */}
            <MovieDetail movie={movie?.data as MovieResponseType} />


            {/* button update */}
            <div className='fixed w-full bottom-0 flex flex-col justify-start items-center z-30 py-4'>
                {/* button */}
                <Link to={`/dashboard/dashboard-movie-detail/${movie?.data?.id}/update`} className=' rounded-full text-center w-[90%] py-3.5 font-bold text-white bg-white/10 backdrop-blur-sm hover:scale-105 transition-transform duration-100 ease-in-out'>
                    Update Movie
                </Link>
            </div>
        </div>
    )
}

export default AdminMovieDetailPage

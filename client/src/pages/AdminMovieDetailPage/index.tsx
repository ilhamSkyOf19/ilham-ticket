import { useEffect, type FC } from 'react'
import { Link } from 'react-router-dom';
// import type { MovieType } from '../../models/movie-model';
import MovieDetail from '../../fragments/MovieDetail';

const AdminMovieDetailPage: FC = () => {
    // data 
    // const data = useLoaderData() as MovieType;



    // scrol top
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])


    return (
        <div className='w-full min-h-[100vh] flex flex-col justify-start items-center relative'>
            {/* detail */}
            <MovieDetail />


            {/* button update */}
            <div className='fixed w-full bottom-0 flex flex-col justify-start items-center z-30 py-4'>
                {/* button */}
                <Link to={`/dashboard/dashboard-movie-detail/${1}/update`} className=' rounded-full text-center w-[90%] py-3.5 font-bold text-white bg-white/10 backdrop-blur-sm hover:scale-105 transition-transform duration-100 ease-in-out'>
                    Update Movie
                </Link>
            </div>
        </div>
    )
}

export default AdminMovieDetailPage

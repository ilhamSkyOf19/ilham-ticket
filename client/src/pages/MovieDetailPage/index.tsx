import { useEffect, type FC } from 'react'
import { Link, useLoaderData } from 'react-router-dom';
import { formatIDR } from '../../helpers/formated';
import type { MovieType } from '../../models/movie-model';
import MovieDetail from '../../fragments/MovieDetail';


// Props

const MovieDetailPage: FC = () => {

    // data 
    const data = useLoaderData() as MovieType;



    // scrol top
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])




    return (
        <div className='w-full min-h-[100vh] flex flex-col justify-start items-start overflow-hidden bg-black'>

            <MovieDetail />

            {/* pricing */}
            <div className='w-full fixed bottom-0 py-4 flex flex-col justify-center items-center z-20'>
                <div className='w-[90%] h-[4.5rem] bg-white/10 backdrop-blur-sm rounded-full flex flex-row justify-between items-center pl-6 pr-3 py-2.5'>
                    {/* price */}
                    <h2 className='text-white font-semibold text-xl'>
                        {formatIDR(data?.price ?? 50000)} / Person
                    </h2>


                    {/* button */}
                    <Link to={'/choose-theater/1'} className='text-base font-bold text-black h-full flex justify-center items-center px-4 bg-white rounded-full capitalize'>
                        buy ticket
                    </Link>
                </div>
            </div>
        </div>
    )
}





export default MovieDetailPage

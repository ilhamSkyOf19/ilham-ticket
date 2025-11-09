import { useEffect, type FC } from 'react'
import CardMovie from '../../components/CardMovie'
import ButtonAddCircleGreen from '../../components/ButtonAddCircleGreen'
import { useLoaderData } from 'react-router-dom'
import type { ResponseType } from '../../types/types'
import type { MovieResponseType } from '../../models/movie-model'

const AdminMoviePage: FC = () => {
    // data movie 
    const movie = useLoaderData() as ResponseType<MovieResponseType[] | null>;

    // cek 
    useEffect(() => {
        console.log(movie);
    }, [movie])

    return (
        <div className='w-full min-h-[100vh] flex flex-col justify-start items-start bg-black px-2 gap-4 relative pt-16'>

            {/* header */}
            <h2 className='text-white font-bold text-lg'>Data Movie</h2>


            {/* button add */}
            <ButtonAddCircleGreen link={'/dashboard/dashboard-movie-add'} />

            {/* movie */}
            <div className='w-full flex flex-col justify-start items-start'>
                {/* card movie */}
                <div className='w-full flex flex-col justify-start items-start gap-3'>
                    {/* card movie */}
                    {
                        // cek 
                        movie.data && movie.data?.length > 0 ? (
                            movie.data.map((movie: MovieResponseType, index: number) => (
                                <CardMovie key={index} dashboard={true} disable={true} movie={movie} />
                            ))
                        ) : (
                            <div className='w-full flex flex-col justify-center items-center'>
                                <h2 className='text-white font-semibold text-lg'>No Data</h2>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default AdminMoviePage

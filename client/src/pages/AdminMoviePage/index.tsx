import { useState, type FC } from 'react'
import CardMovie from '../../components/CardMovie'
import ButtonAddCircleGreen from '../../components/ButtonAddCircleGreen'
import { useLoaderData, useRevalidator } from 'react-router-dom'
import type { ResponseType } from '../../types/types'
import type { MovieResponseType } from '../../models/movie-model'
import { MovieService } from '../../services/movie.service'
import ModalDelete from '../ModalDelete'

const AdminMoviePage: FC = () => {
    // data movie 
    const movie = useLoaderData() as ResponseType<MovieResponseType[] | null>;


    // revalidate 
    const { revalidate } = useRevalidator();


    // state modal delete 
    const [modalDelete, setModalDelete] = useState<boolean>(false);

    // state id for delete 
    const [id, setId] = useState<number>(0);

    // handle modal delete 
    const handleModalActive = (id: number) => {
        // set id 
        setId(id);

        // set active 
        setModalDelete(true);
    }


    // handle delete 
    const handleDelete = async (id: number) => {

        // call service 
        const response = await MovieService.delete(id);

        // cek status 
        if (response.status === 'success') {
            // reload 
            revalidate();

            // close modal 
            setModalDelete(false);
        }

    }






    return (
        <div className='w-full min-h-screen flex flex-col justify-start items-start bg-black px-2 gap-4 relative pt-16'>

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
                                <CardMovie key={index} dashboard={true} disable={true} movie={movie} handleModalActive={handleModalActive} />
                            ))
                        ) : (
                            <div className='w-full flex flex-col justify-center items-center'>
                                <h2 className='text-white font-semibold text-lg'>No Data</h2>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* modal delete */}
            <ModalDelete active={modalDelete} handleClose={() => setModalDelete(false)} handleDelete={handleDelete} id={id} />
        </div>
    )
}

export default AdminMoviePage

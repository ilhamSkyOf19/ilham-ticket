import { useState, type FC } from 'react'
import ButtonAddCircleGreen from '../../components/ButtonAddCircleGreen'
import CardGenre from '../../components/CardGenre'
import { useLoaderData, useRevalidator } from 'react-router-dom'
import type { ResponseType } from '../../types/types'
import type { GenreResponseType } from '../../models/genre-model'
import { GenreService } from '../../services/genre.service'
import ModalDelete from '../ModalDelete'
import EmptyMessage from '../EmptyMessage'

const AdminListGenrePage: FC = () => {

    // loader 
    const genres = useLoaderData() as ResponseType<GenreResponseType[] | null>;

    // revalidate 
    const { revalidate } = useRevalidator();

    // state modal delete 
    const [modalDelete, setModalDelete] = useState<boolean>(false);

    // state id for delete 
    const [id, setId] = useState<number>(0);

    // handle modal active 
    const handleModalActive = (id: number) => {
        // set id 
        setId(id);

        // set active 
        setModalDelete(true);
    }

    // handle delete 
    const handleDelete = async (id: number) => {

        // call service 
        const response = await GenreService.delete(id);

        // cek response 
        if (response.status === 'success') {
            // reload
            revalidate();

            // set modal 
            setModalDelete(false);
        } else {
            console.log(response.message);
        }
    }


    return (
        <div className='w-full flex flex-col justify-start items-start py-18 px-2'>
            {/* header */}
            <div className='w-full flex flex-row justify-center items-start'>
                <h2 className='text-white font-bold text-base'>List Bonus</h2>
            </div>

            {/* button add genre */}
            <ButtonAddCircleGreen link={'/dashboard/dashboard-genre-add'} />

            {/* content list  */}
            <div className='w-full flex flex-col justify-start items-start gap-4 mt-8'>
                {/* card genre */}
                {
                    genres.data && genres.data?.length > 0 ? (
                        genres.data.map((genre: GenreResponseType, index: number) => (

                            <CardGenre key={index} name={genre.name} id={genre.id} handleDelete={handleModalActive} />
                        ))
                    ) : (
                        <EmptyMessage message={'Data genre tidak ditemukan'} />
                    )
                }
            </div>

            {/* modal delete */}
            <ModalDelete active={modalDelete} handleClose={() => setModalDelete(false)} handleDelete={handleDelete} id={id} />
        </div>
    )
}

export default AdminListGenrePage

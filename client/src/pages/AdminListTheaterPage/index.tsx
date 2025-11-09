import { useEffect, useState, type FC } from 'react'
import { useLoaderData, useRevalidator } from 'react-router-dom'
import type { TheaterResponseType } from '../../models/theater-model';
import type { ResponseType } from '../../types/types';
import CardTheater from '../../components/CardTheater';
import ButtonAddCircleGreen from '../../components/ButtonAddCircleGreen';
import ModalDelete from '../ModalDelete';
import { TheaterService } from '../../services/theater.service';
import ModalErrorUp from '../../components/ModalErrorUp';

const AdminListTheaterPage: FC = () => {

    // loader
    const theaters = useLoaderData() as ResponseType<TheaterResponseType[] | null>;

    // reavalidate 
    const reavalidate = useRevalidator();

    // state id modal 
    const [id, setId] = useState<number>(0);


    // state active modal 
    const [active, setActive] = useState<boolean>(false);

    // state modal error 
    const [modalError, setModalError] = useState<boolean>(false);

    // state message 
    const [messageErrorForModal, setMessageErrorForModal] = useState<string>('');


    // handle close modal
    const handleModalClose = () => setActive(false);

    // handle active modal 
    const handleModalActive = (id: number) => {
        // set id
        setId(id);

        // set active
        setActive(true);
    };



    // handle delete 
    const handleDelete = (id: number) => {
        // cek id 
        if (theaters.data) {
            // delete 
            const response = async () => {
                const api = await TheaterService.delete(id);

                // cek status 
                if (api.status === 'success') {
                    // reload 
                    reavalidate.revalidate();

                    // close modal 
                    setActive(false);
                } else {
                    // set message error 
                    setMessageErrorForModal(api.message);

                    // set active modal error 
                    setModalError(true);
                }
            }

            // call api 
            response();
        };
    }







    useEffect(() => {
        if (theaters.status === 'success') {
            console.log(theaters.data);
        }
    }, [theaters])



    return (
        <div className='w-full flex flex-col justify-start items-start py-18 px-2'>
            {/* header */}
            <div className='w-full flex flex-row justify-center items-start'>
                <h2 className='text-white font-bold text-base'>List Theaters</h2>
            </div>

            {/* button add */}
            <ButtonAddCircleGreen link={'/dashboard/dashboard-theater-add'} />

            {/* theaters */}
            <div className='w-full flex flex-col justify-start items-start flex-wrap mt-8 px-4 gap-4'>

                {/* card theaters */}
                {
                    theaters.status === 'success' && theaters?.data && theaters?.data?.length > 0 ? (
                        theaters.data.map((theater: TheaterResponseType, index: number) => (
                            <CardTheater key={index} id={theater.id} thumbnail={undefined} name={theater.name} location={theater.city} handleModalActive={handleModalActive} />
                        ))
                    ) : (
                        <div className='w-full flex flex-row justify-center items-center'>
                            <h2 className='text-white font-bold text-base text-center'>No theaters found</h2>
                        </div>
                    )
                }
            </div>

            {/* modal delete */}
            <ModalDelete active={active} handleClose={handleModalClose} handleDelete={handleDelete} id={id} />


            {/* modal error */}
            <ModalErrorUp active={modalError} handleClose={() => setModalError(false)} message={messageErrorForModal} />
        </div>
    )
}

export default AdminListTheaterPage

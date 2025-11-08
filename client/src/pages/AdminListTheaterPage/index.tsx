import { useEffect, type FC } from 'react'
import { useLoaderData } from 'react-router-dom'
import type { TheaterResponseType } from '../../models/theater-model';
import type { ResponseType } from '../../types/types';
import CardTheater from '../../components/CardTheater';
import ButtonAddCircleGreen from '../../components/ButtonAddCircleGreen';

const AdminListTheaterPage: FC = () => {

    // loader
    const theaters = useLoaderData() as ResponseType<TheaterResponseType[] | null>;

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
            <div className='w-full flex flex-row justify-start items-start flex-wrap mt-8 px-4'>

                {/* card theaters */}
                {
                    theaters.status === 'success' && theaters?.data && theaters?.data?.length > 0 ? (
                        theaters.data.map((theater: TheaterResponseType, index: number) => (
                            <CardTheater key={index} id={theater.id} thumbnail={undefined} name={theater.name} location={theater.city} />
                        ))
                    ) : (
                        <h2 className='text-white font-bold text-base'>No theaters found</h2>
                    )
                }
            </div>

        </div>
    )
}

export default AdminListTheaterPage

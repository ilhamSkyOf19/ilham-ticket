import { useState, type FC } from 'react'

import CardBonus from '../../components/CardBonus'
import { useLoaderData, useRevalidator } from 'react-router-dom'
import type { ResponseType } from '../../types/types'
import type { BonusResponseType } from '../../models/bonus-model'
import EmptyMessage from '../EmptyMessage'
import ButtonAddCircleGreen from '../../components/ButtonAddCircleGreen'
import ModalDelete from '../ModalDelete'
import { BonusService } from '../../services/bonus.service'

const AdminListBonusPage: FC = () => {


    // loader 
    const bonus = useLoaderData() as ResponseType<BonusResponseType[] | null>;


    // revalidate 
    const { revalidate } = useRevalidator();

    // state id for delete
    const [id, setId] = useState<number>(0);


    // state modal delete 
    const [modalDelete, setModalDelete] = useState<boolean>(false);

    // handle modal delete 
    const handleModalActive = (id: number) => {
        // set id 
        setId(id);

        // set active 
        setModalDelete(true);
    }

    // handle delete 
    const handleDelete = async (id: number) => {

        // cal service 
        const response = await BonusService.delete(id);

        // cek status 
        if (response.status === 'success') {

            // reload 
            revalidate();

            // close modal 
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

            {/* button add */}
            <ButtonAddCircleGreen link={'/dashboard/dashboard-bonus-add'} />

            {/* container bonus */}
            <div className='w-full flex flex-col justify-start items-start flex-wrap mt-8 px-4 gap-4'>

                {
                    bonus?.status === 'success' && (
                        bonus?.data && bonus?.data?.length > 0 ? (
                            bonus.data.map((item: BonusResponseType, index: number) => (
                                <CardBonus key={index} id={item.id} name={item.name} size={item.size} url_img={item.url_img} handleDelete={handleModalActive} />
                            ))
                        ) : (
                            <EmptyMessage message='Tidak Ada Bonus' />
                        )
                    )
                }
            </div>

            {/* modal delete  */}
            <ModalDelete active={modalDelete} handleClose={() => setModalDelete(false)} handleDelete={handleDelete} id={id} />

        </div>
    )
}

export default AdminListBonusPage

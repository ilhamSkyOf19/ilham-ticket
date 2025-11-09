import { useState, type FC } from 'react'
import InputComponent from '../../fragments/InputComponent'
import { useForm } from 'react-hook-form'
import type { TheaterCreateType, TheaterResponseType, TheaterUpdateType } from '../../models/theater-model'
import { zodResolver } from '@hookform/resolvers/zod'
import { TheaterValidation } from '../../validations/theater-validation'
import { useMutation } from '@tanstack/react-query'
import { TheaterService } from '../../services/theater.service'
import ButtonSubmit from '../../components/ButtonSubmit'
import { AxiosError } from 'axios'
import ModalErrorUp from '../../components/ModalErrorUp'
import { useLoaderData, useNavigate } from 'react-router-dom'
import type { ResponseType } from '../../types/types'

const AdminTheaterAddPage: FC = () => {


    // use loaoder 
    const theater = useLoaderData() as ResponseType<TheaterResponseType | null>;

    // navigate 
    const navigate = useNavigate();

    // state modal active 
    const [modalActive, setModalActive] = useState<boolean>(false);


    // handle close 
    const handleClose = () => setModalActive(false);


    // use form 
    const { register, handleSubmit, formState: { errors } } = useForm<TheaterCreateType | TheaterUpdateType>({

        // default values 
        defaultValues: {
            name: theater?.data?.name || '',
            city: theater?.data?.city || ''
        },
        resolver: zodResolver(theater ? TheaterValidation.UPDATE : TheaterValidation.CREATE)
    })


    // mutation
    const { isPending, mutateAsync } = useMutation({
        mutationFn: async (data: TheaterCreateType | TheaterUpdateType) => {
            theater ? await TheaterService.update(theater.data?.id || 0, data as TheaterUpdateType) : await TheaterService.create(data as TheaterCreateType);
        },
        onError: (error) => {
            // cek error form axios 
            if (error instanceof AxiosError) {
                console.log(error.response?.data?.message);

                // set modal 
                setModalActive(true);
            }

            console.log(error);
        },
        onSuccess: (data) => {
            // cek data 
            console.log(data);


            // navigate
            navigate('/dashboard/theater');
        }
    })


    // on submit
    const onSubmit = async (data: TheaterCreateType | TheaterUpdateType) => {
        try {
            // cek data 
            if (!data) return;


            // mutation 
            await mutateAsync(data);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='w-full flex flex-col justify-start items-start py-18 px-2'>
            {/* header */}
            <div className='w-full flex flex-row justify-center items-start'>
                <h2 className='text-white font-bold text-base'>Add Theater</h2>
            </div>


            {/* form */}
            <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col justify-start items-start mt-4'>
                {/* input name */}
                <InputComponent
                    name='name'
                    label='Name Theater'
                    type='text'
                    placeholder='Enter name theater'
                    register={register('name')}
                    error={errors.name?.message}
                />

                {/* city */}
                <InputComponent
                    name='city'
                    label='City'
                    type='text'
                    placeholder='Enter city'
                    register={register('city')}
                    error={errors.city?.message}
                />

                {/* button */}
                <div className='w-full mt-4'>
                    <ButtonSubmit label='Submit' isPending={isPending} />
                </div>
            </form>


            {/* modal error */}
            <ModalErrorUp active={modalActive} handleClose={handleClose} message='Ada Kesalahan Server' />

        </div>
    )
}

export default AdminTheaterAddPage

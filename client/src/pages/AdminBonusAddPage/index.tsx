import { useState, type FC } from 'react'
import InputComponent from '../../fragments/InputComponent'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import ButtonSubmit from '../../components/ButtonSubmit'
import { AxiosError } from 'axios'
import ModalErrorUp from '../../components/ModalErrorUp'
import { useLoaderData, useNavigate } from 'react-router-dom'
import type { ResponseType } from '../../types/types'
import InputImgSmall from '../../components/InputImgSmall'
import type { BonusCreateType, BonusResponseType, BonusUpdateType } from '../../models/bonus-model'
import { BonusValidation } from '../../validations/bonus-validation'
import { BonusService } from '../../services/bonus.service'
import HeaderDashboardData from '../../components/HeaderDashboardData'


const AdminBonusAddPage: FC = () => {


    // use loaoder 
    const bonus = useLoaderData() as ResponseType<BonusResponseType | null>;

    // navigate 
    const navigate = useNavigate();

    // state modal active 
    const [modalActive, setModalActive] = useState<boolean>(false);


    // handle close 
    const handleClose = () => setModalActive(false);


    // use form 
    const { register, handleSubmit, formState: { errors }, control, setValue, clearErrors } = useForm<BonusCreateType | BonusUpdateType>({

        // default values 
        defaultValues: {
            name: bonus?.data?.name || '',
            size: bonus?.data?.size || ''
        },
        resolver: zodResolver(bonus ? BonusValidation.UPDATE : BonusValidation.CREATE)
    })


    // mutation
    const { isPending, mutateAsync } = useMutation({
        mutationFn: async (data: BonusCreateType | BonusUpdateType) => {
            bonus ? await BonusService.update(bonus.data?.id || 0, data as BonusUpdateType) : await BonusService.create(data as BonusCreateType);
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
            navigate('/dashboard/bonus');
        }
    })


    // on submit
    const onSubmit = async (data: BonusCreateType | BonusUpdateType) => {
        try {
            // cek data 
            if (!data) return;

            // form data 
            const formData = new FormData();

            // append data 
            formData.append('name', data.name || '');
            formData.append('size', data.size || '');


            // file img
            if (data.img) {
                formData.append('img', data.img);
            }



            // mutation 
            await mutateAsync(data);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='w-full flex flex-col justify-start items-start py-18 px-2'>

            {/* header */}
            <HeaderDashboardData title={bonus ? 'Update Data Bonus' : 'Add Data Bonus'} />


            {/* form */}
            <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col justify-start items-start mt-4'>
                {/* input img */}
                <Controller
                    name='img'
                    control={control}
                    render={({ fieldState }) => (
                        <InputImgSmall
                            setValuesBonus={setValue}
                            clearErrorsBonus={clearErrors}
                            error={fieldState.error?.message}
                            type='bonus'
                            previewUpdate={bonus?.data?.url_img}
                        />
                    )}
                />

                {/* input name */}
                <InputComponent
                    name='name'
                    label='Name Bonus'
                    type='text'
                    placeholder='Enter name bonus'
                    register={register('name')}
                    error={errors.name?.message}
                />

                {/* city */}
                <InputComponent
                    name='size'
                    label='Size'
                    type='text'
                    placeholder='Enter size'
                    register={register('size')}
                    error={errors.size?.message}
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

export default AdminBonusAddPage

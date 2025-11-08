import { type FC } from 'react'
import InputComponent from '../../fragments/InputComponent'
import { useForm } from 'react-hook-form'
import type { TheaterCreateType } from '../../models/theater-model'
import { zodResolver } from '@hookform/resolvers/zod'
import { TheaterValidation } from '../../validations/theater-validation'
import { useMutation } from '@tanstack/react-query'
import { TheaterService } from '../../services/theater.service'
import ButtonSubmit from '../../components/ButtonSubmit'

const AdminTheaterAddPage: FC = () => {


    // use form 
    const { register, handleSubmit, formState: { errors } } = useForm<TheaterCreateType>({
        resolver: zodResolver(TheaterValidation.CREATE)
    })


    // mutation
    const { isPending, mutateAsync } = useMutation({
        mutationFn: async (data: TheaterCreateType) => {
            await TheaterService.create(data)
        },
    })


    // on submit
    const onSubmit = async (data: TheaterCreateType) => {
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
            <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col justify-start items-start gap-2 mt-4'>
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
                <ButtonSubmit label='Submit' isPending={isPending} />
            </form>

        </div>
    )
}

export default AdminTheaterAddPage

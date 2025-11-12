import { useState, type FC } from 'react'
import InputComponent from '../../fragments/InputComponent'
import { useForm } from 'react-hook-form'
import type { GenreCreateType } from '../../models/genre-model'
import { zodResolver } from '@hookform/resolvers/zod'
import { GenreValidation } from '../../validations/genre-validation'
import { useMutation } from '@tanstack/react-query'
import { GenreService } from '../../services/genre.service'
import ButtonSubmit from '../../components/ButtonSubmit'
import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import ModalErrorUp from '../../components/ModalErrorUp'
import HeaderDashboardData from '../../components/HeaderDashboardData'

const AdminGenreAddPage: FC = () => {

    // navigate 
    const navigate = useNavigate();


    // state modal
    const [modalActive, setModalActive] = useState<boolean>(false);


    // handle close modal
    const handleCloseModal = () => setModalActive(false);


    // use hook form 
    const { register, handleSubmit, formState: { errors }, setError } = useForm<GenreCreateType>({
        resolver: zodResolver(GenreValidation.CREATE)
    })

    // use mutation
    const { isPending, mutateAsync } = useMutation({
        mutationFn: async (data: GenreCreateType) => {
            await GenreService.create(data)
        },

        // error
        onError: (error) => {
            console.log(error);

            // error form axios 
            if (error instanceof AxiosError) {
                console.log(error.response?.data?.message);

                // error exist data 
                setError('name', { message: error.response?.data?.message });
            }


            // set modal 
            setModalActive(true);
        },

        // success
        onSuccess: () => {
            // navigate 
            navigate('/dashboard/genre');
        }
    })


    // onsubmit
    const onSubmit = async (data: GenreCreateType) => {
        try {
            // cek empty data 
            if (!data) {
                return;
            }


            await mutateAsync(data);
        } catch (error) {
            console.log(error);
        }
    }


    // 
    return (
        <div className='w-full flex flex-col justify-start items-start py-18 px-2'>
            {/* header */}
            <HeaderDashboardData title='Add New Movie' />

            {/* form */}
            <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col justify-start items-start gap-2 mt-4'>

                {/* input  */}
                <InputComponent
                    label='Nama Genre'
                    name='name'
                    type='text'
                    placeholder='Masukan Nama Genre'
                    register={register('name')}
                    error={errors.name?.message}
                />


                {/* button submit */}
                <ButtonSubmit label='Submit' isPending={isPending} />
            </form>

            {/* modal error */}
            <ModalErrorUp active={modalActive} handleClose={handleCloseModal} message='Ada Kesalahan Server' />
        </div>
    )
}

export default AdminGenreAddPage

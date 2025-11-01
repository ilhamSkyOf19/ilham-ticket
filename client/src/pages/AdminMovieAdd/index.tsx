import { type FC } from 'react'
import { useForm } from 'react-hook-form'
import type { MovieCreateType } from '../../models/movie-model'
import { zodResolver } from '@hookform/resolvers/zod'
import { MovieValidation } from '../../validations/movie-validation'
import { useMutation } from '@tanstack/react-query'
import InputComponent from '../../fragments/InputComponent'

const AdminMovieAdd: FC = () => {




    // use hook form
    const { register, handleSubmit, formState: { errors } } = useForm<MovieCreateType>({
        resolver: zodResolver(MovieValidation.CREATE)
    })


    // mutation 
    const { isPending } = useMutation({
        mutationFn: async (data: MovieCreateType) => {
            console.log(data);
        }
    })


    // on submit
    const onSubmit = (data: MovieCreateType) => {
        console.log(data);
    }
    return (
        <div className='w-full min-h-[100vh] py-16 flex flex-col justify-start items-start px-2 gap-4'>

            {/* header */}
            <div className='w-full flex flex-row justify-start items-start'>
                <h2 className='text-white font-bold text-base'>Add New Movie</h2>
            </div>


            {/* form */}
            <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col justify-start items-start px-2'>

                {/* input title */}
                <InputComponent
                    label='Title'
                    name='title'
                    register={register('title')}
                    placeholder='Enter movie title'
                    error={errors.title?.message}
                    type='text'
                />

                {/* input about */}
                <InputComponent
                    label='About'
                    name='about'
                    register={register('about')}
                    placeholder='Enter movie about'
                    error={errors.about?.message}
                    type='text'
                />

                {/* input rating */}
                <InputComponent
                    label='Rating'
                    name='rating'
                    register={register('rating')}
                    placeholder='Enter movie rating'
                    error={errors.rating?.message}
                    type='text'
                />

                {/* input about */}
                <InputComponent
                    label='Location'
                    name='location'
                    register={register('location')}
                    placeholder='Enter movie location'
                    error={errors.location?.message}
                    type='text'
                />

                {/* input rating */}
                <InputComponent
                    label='Price'
                    name='price'
                    register={register('price')}
                    placeholder='Enter movie price'
                    error={errors.price?.message}
                    type='text'
                />


                {/* input rating */}
                <InputComponent
                    label='Rating'
                    name='rating'
                    register={register('rating')}
                    placeholder='Enter movie rating'
                    error={errors.rating?.message}
                    type='text'
                />

                {/* input location */}
                <InputComponent
                    label='Location'
                    name='location'
                    register={register('location')}
                    placeholder='Enter movie location'
                    error={errors.location?.message}
                    type='text'
                />


                {/* input genre */}
                <InputComponent
                    label='Genre'
                    name='genre'
                    register={register('genre')}
                    placeholder='Enter movie genre'
                    error={errors.genre?.message}
                    type='text'
                />






                {/* button submit */}
                <button type='submit' disabled={isPending} className='w-full flex flex-row justify-center items-center bg-white py-2.5 rounded-full text-black font-bold hover:scale-103 transition-all duration-300 ease-in-out mt-8'>
                    Submit
                </button>
            </form>
        </div>
    )
}

export default AdminMovieAdd

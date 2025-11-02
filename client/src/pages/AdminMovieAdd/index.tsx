import { type FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import type { MovieCreateType } from '../../models/movie-model'
import { zodResolver } from '@hookform/resolvers/zod'
import { MovieValidation } from '../../validations/movie-validation'
import { useMutation } from '@tanstack/react-query'
import InputComponent from '../../fragments/InputComponent'
import InputChoose from '../../components/InputChoose'
import ChooseTheaters from '../../components/ChooseTheaters'

const AdminMovieAdd: FC = () => {



    // use hook form
    const { control, register, handleSubmit, formState: { errors }, setValue, clearErrors } = useForm<MovieCreateType>({
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

        // form data 
        const formData = new FormData()
        formData.append('thumbnail', data.thumbnail)
        formData.append('title', data.title)
        formData.append('about', data.about)
        formData.append('rating', data.rating)
        formData.append('location', data.location)
        formData.append('price', data.price)
        formData.append('genre', data.genre)
        formData.append('theaters', JSON.stringify(data.theaters))



        for (const [key, value] of formData.entries()) {
            console.log(key, value);
        }



    }


    return (
        <div className='w-full min-h-[100vh] py-16 flex flex-col justify-start items-start px-2 gap-4'>

            {/* header */}
            <div className='w-full flex flex-row justify-start items-start'>
                <h2 className='text-white font-bold text-base'>Add New Movie</h2>
            </div>


            {/* form */}
            <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col justify-start items-start px-2'>

                {/* input thumbnail */}
                <InputComponent
                    label='Thumbnail'
                    name='thumbnail'
                    register={register('thumbnail')}
                    placeholder='Enter movie thumbnail'
                    error={errors.thumbnail?.message}
                    type='text'
                />


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

                {/* input location */}
                <InputComponent
                    type='text'
                    placeholder='Enter your email'
                    register={register('location')}
                    label='location'
                    name='location'
                    error={errors.location?.message}
                />



                {/* choose genre */}
                <Controller
                    control={control}
                    name='genre'
                    render={({ field, fieldState }) => (
                        <InputChoose
                            name='genre'
                            label='Genre'
                            placeholder='Enter movie genre'
                            fieldChoose={[
                                {
                                    id: 1,
                                    name: 'Action'
                                },
                                {
                                    id: 2,
                                    name: 'Comedy'
                                },
                                {
                                    id: 3,
                                    name: 'Horror'
                                },
                                {
                                    id: 4,
                                    name: 'Wars'
                                },
                                {
                                    id: 5,
                                    name: 'Animation'
                                },
                                {
                                    id: 6,
                                    name: 'Romance'
                                }
                            ]}
                            error={fieldState.error?.message}
                            setValue={setValue}
                            clearErrors={clearErrors}
                            ref={field.ref}
                        />
                    )}

                />


                {/* input price */}
                <InputComponent
                    label='Price'
                    name='price'
                    register={register('price')}
                    placeholder='Enter movie price'
                    error={errors.price?.message}
                    type='text'
                />

                {/* choose theater */}
                <Controller
                    control={control}
                    name='theaters'
                    render={({ fieldState }) => (
                        <ChooseTheaters
                            setValue={setValue}
                            clearErrors={clearErrors}
                            error={fieldState.error?.message}

                        />
                    )}

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

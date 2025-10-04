import { type FC } from 'react'


import { zodResolver } from '@hookform/resolvers/zod'
import SignLayout from '../../Layouts/SignLayout'
import InputSing from '../../components/InputSign'
import { useForm } from 'react-hook-form'
import { AuthValidation } from '../../validations/auth-validation'
import type { SignType } from '../../models/auth-model'
import ButtonSubmit from '../../components/ButtonSubmit'
import { useMutation } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

const SignInPages: FC = () => {


    // use hook form
    const { register, handleSubmit, formState: { errors } } = useForm<SignType>({
        resolver: zodResolver(AuthValidation.SIGN_IN)
    })


    // mutation 
    const { isPending, mutateAsync } = useMutation({
        mutationFn: async (data: SignType) => {
            console.log(data);
        }
    })

    // handle submit 
    const onSubmit = async (data: SignType) => {
        try {

            await mutateAsync(data);
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <SignLayout type='signin'>
            <div className='absolute inset-0 flex flex-col justify-end items-start w-full bg-transparent z-20 overflow-auto'>
                {/* content */}
                <div className='w-full h-full flex flex-col justify-end items-start px-6'>
                    {/* title */}
                    <h1 className='w-full text-3xl font-bold text-white capitalize'>sign in</h1>

                    {/* form */}
                    <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col justify-start items-start mt-6 gap-0.5 pb-12'>
                        {/* input email */}
                        <InputSing
                            type='email'
                            placeholder='Enter your email'
                            register={register('email')}
                            label='email'
                            name='email'
                            error={errors.email?.message}
                        />

                        <InputSing
                            type='password'
                            placeholder='Enter your password'
                            register={register('password')}
                            label='password'
                            name='password'
                            error={errors.password?.message}
                        />


                        {/* button */}
                        <div className='w-full mt-4'>
                            <ButtonSubmit label='Sign In' isPending={isPending} />
                        </div>

                        {/* sign */}
                        <Link to='/signup' className='w-full rounded-full bg-[#FFFFFF33] text-center mt-2 py-3.5 font-bold text-white'>
                            Create New Account
                        </Link>
                    </form>


                </div>
            </div>
        </SignLayout>
    )
}

export default SignInPages

import { type FC } from 'react'


import { zodResolver } from '@hookform/resolvers/zod'
import SignLayout from '../../Layouts/SignLayout'
import { useForm } from 'react-hook-form'
import { AuthValidation } from '../../validations/auth-validation'
import type { SignInType } from '../../models/auth-model'
import ButtonSubmit from '../../components/ButtonSubmit'
import { useMutation } from '@tanstack/react-query'
import InputComponent from '../../fragments/InputComponent'

const SignInPage: FC = () => {


    // use hook form
    const { register, handleSubmit, formState: { errors } } = useForm<SignInType>({
        resolver: zodResolver(AuthValidation.SIGN_IN)
    })


    // mutation 
    const { isPending, mutateAsync } = useMutation({
        /*************  ✨ Windsurf Command ⭐  *************/
        /**

/*******  bb9ed7c1-9928-4d4a-b623-1c1fdbcbc2cc  *******/
        mutationFn: async (data: SignInType) => {
            console.log(data);
        }
    })

    // handle submit 
    const onSubmit = async (data: SignInType) => {
        try {


            await mutateAsync(data);
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <SignLayout type='signin'>
            {/* form */}
            <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col justify-start items-start mt-6 gap-0.5'>
                {/* input email */}
                <InputComponent
                    type='email'
                    placeholder='Enter your email'
                    register={register('email')}
                    label='email'
                    name='email'
                    error={errors.email?.message}
                />

                <InputComponent
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
            </form>


        </SignLayout>
    )
}

export default SignInPage

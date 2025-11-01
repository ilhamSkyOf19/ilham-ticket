import { type FC } from 'react'
import SignLayout from '../../Layouts/SignLayout'
import { useForm } from 'react-hook-form'
import type { SignUpType } from '../../models/auth-model'
import { zodResolver } from '@hookform/resolvers/zod'
import { AuthValidation } from '../../validations/auth-validation'
import { useMutation } from '@tanstack/react-query'
import ButtonSubmit from '../../components/ButtonSubmit'
import InputComponent from '../../fragments/InputComponent'

const SignUpPage: FC = () => {

    // use form 
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors } } = useForm<SignUpType>({
            resolver: zodResolver(AuthValidation.SIGN_UP)
        })


    // mutation 
    const { isPending, mutateAsync } = useMutation({
        mutationFn: async (data: SignUpType) => {
            console.log(data);
        }
    })

    // on submit 
    const onSubmit = async (data: SignUpType) => {
        try {
            // cek password & confirm password
            if (data.password !== data.confirmPassword) {
                // set error password
                setError('password', { message: 'Password tidak sama' });

                // set error confirm password
                setError('confirmPassword', { message: 'Password tidak sama' });
            }
            // mutation
            await mutateAsync(data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <SignLayout type='signup'>
            {/* form */}
            <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col justify-start items-start mt-6 gap-0.5'>
                {/* input name */}
                <InputComponent
                    name='name'
                    label='Name'
                    type='text'
                    register={register('name')}
                    placeholder='Enter your name'
                    error={errors.name?.message}
                />

                {/* input email */}
                <InputComponent
                    name='email'
                    label='Email'
                    type='email'
                    register={register('email')}
                    placeholder='Enter your email'
                    error={errors.email?.message}
                />

                {/* input password */}
                <InputComponent
                    name='password'
                    label='Password'
                    type='password'
                    register={register('password')}
                    placeholder='Enter your password'
                    error={errors.password?.message}
                />

                {/* input confirm password */}
                <InputComponent
                    name='confirmPassword'
                    label='Confirm Password'
                    type='password'
                    register={register('confirmPassword')}
                    placeholder='Enter your confirm password'
                    error={errors.confirmPassword?.message}
                />


                {/* button sign  */}
                <div className='w-full mt-4'>
                    <ButtonSubmit label='Create New Account' isPending={isPending} />
                </div>
            </form>
        </SignLayout>
    )
}

export default SignUpPage

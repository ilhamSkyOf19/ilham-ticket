import { useState, type FC } from 'react'
import SignLayout from '../../Layouts/SignLayout'
import { useForm } from 'react-hook-form'
import type { SignUpType } from '../../models/auth-model'
import { zodResolver } from '@hookform/resolvers/zod'
import { AuthValidation } from '../../validations/auth-validation'
import { useMutation } from '@tanstack/react-query'
import ButtonSubmit from '../../components/ButtonSubmit'
import InputComponent from '../../fragments/InputComponent'
import { AuthService } from '../../services/auth.service'
import { AxiosError } from 'axios'
import ModalErrorUp from '../../components/ModalErrorUp'
import { useNavigate } from 'react-router-dom'

const SignUpPage: FC = () => {

    // redirect 
    const navigate = useNavigate();

    // state modal active 
    const [modalActive, setModalActive] = useState<boolean>(false);


    // handle close modal 
    const handleClose = () => setModalActive(false);


    // state error message 
    const [message, setMessage] = useState<string>('');

    // use form 
    const {
        register,
        handleSubmit,
        formState: { errors } } = useForm<SignUpType>({
            resolver: zodResolver(AuthValidation.SIGN_UP)
        })


    // mutation 
    const { isPending, mutateAsync } = useMutation({
        mutationFn: async (data: SignUpType) => {
            await AuthService.signUp(data);
        },
        onSuccess: (data) => {
            // cek data
            console.log(data);


            // redirect to sign in
            navigate('/');
        },
        onError: (error) => {
            // cek error form axios 
            if (error instanceof AxiosError) {
                console.log(error.response?.data?.message);

                // set message error
                setMessage(error.response?.data?.message);

                // active modal 
                setModalActive(true);
            }


        }
    })

    // on submit 
    const onSubmit = async (data: SignUpType) => {
        try {
            // console.log(data);
            // mutation
            await mutateAsync(data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
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



                    {/* button sign  */}
                    <div className='w-full mt-4'>
                        <ButtonSubmit label='Create New Account' isPending={isPending} />
                    </div>
                </form>

                {/* modal */}
                <ModalErrorUp active={modalActive} handleClose={handleClose} message={message} />


            </SignLayout>

        </>
    )
}

export default SignUpPage

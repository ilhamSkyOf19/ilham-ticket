import { useState, type FC } from 'react'


import { zodResolver } from '@hookform/resolvers/zod'
import SignLayout from '../../Layouts/SignLayout'
import { useForm } from 'react-hook-form'
import { AuthValidation } from '../../validations/auth-validation'
import type { SignInType } from '../../models/auth-model'
import ButtonSubmit from '../../components/ButtonSubmit'
import { useMutation } from '@tanstack/react-query'
import InputComponent from '../../fragments/InputComponent'
import { AuthService } from '../../services/auth.service'
import { AxiosError } from 'axios'
import ModalErrorUp from '../../components/ModalErrorUp'
import { useNavigate } from 'react-router-dom'

const SignInPage: FC = () => {

    // navigate 
    const navigate = useNavigate();


    // state modal 
    const [modalActive, setModalActive] = useState<boolean>(false);

    // handle modal close 
    const handleModalClose = () => setModalActive(false);

    // state modal error message 
    const [messageModal, setMessageModal] = useState<string>('');


    // use hook form
    const { register, handleSubmit, formState: { errors }, setError } = useForm<SignInType>({
        resolver: zodResolver(AuthValidation.SIGN_IN)
    })


    // mutation 
    const { isPending, mutateAsync } = useMutation({
        mutationFn: async (data: SignInType) => {
            await AuthService.signIn(data);
        },

        // on error 
        onError: (error) => {
            // cek error form axios 
            if (error instanceof AxiosError) {
                // cek status 401
                if (error.status === 401) {
                    // set error email
                    setError('email', { message: error.response?.data?.message });

                    // set error password
                    setError('password', { message: error.response?.data?.message });
                }
            }

            // set error message
            setModalActive(true);

            // set another error message
            setMessageModal(error.message);


        },

        // on success 
        onSuccess: () => {
            // redirect to dashboard
            navigate('/dashboard');
        }
    })

    // handle submit 
    const onSubmit = async (data: SignInType) => {
        try {

            // cek data 
            if (!data) {
                return;
            }


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

            {/* Modal error */}
            <ModalErrorUp active={modalActive} handleClose={handleModalClose} message={messageModal} />


        </SignLayout>
    )
}

export default SignInPage

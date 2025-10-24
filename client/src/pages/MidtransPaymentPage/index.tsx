import { useEffect, type FC } from 'react'
import { useNavigate } from 'react-router-dom'

const MidtransPaymentPage: FC = () => {

    // navigate 
    const navigate = useNavigate();
    // redirect
    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/topup-success');
        }, 1000)

        return () => clearTimeout(timer)
    }, [])


    return (
        <div className='w-full h-[100vh] flex flex-col justify-center items-center bg-black'>
            <h1 className='text-4xl font-bold text-white text-center'>
                Open Midtrans <br /> Payment
            </h1>
        </div>
    )
}

export default MidtransPaymentPage

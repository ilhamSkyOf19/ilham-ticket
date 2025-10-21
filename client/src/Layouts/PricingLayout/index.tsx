import { type FC } from 'react'
import ButtonBack from '../../components/ButtonBack'
import { Outlet, useNavigate } from 'react-router-dom'

const PricingLayout: FC = () => {


    // navigate 
    const navigate = useNavigate();
    return (
        <div className='w-full flex flex-col justify-start items-start pt-12 '>
            {/* header */}
            <div className='w-full h-12 relative flex flex-row justify-center items-center'>
                {/* nav back */}
                <ButtonBack handleBack={() => navigate(-1)} />

                {/* title */}
                <h2 className='text-white text-base capitalize font-semibold'>
                    Choose Theater
                </h2>
            </div>


            {/* children */}
            <Outlet />
        </div>
    )
}

export default PricingLayout

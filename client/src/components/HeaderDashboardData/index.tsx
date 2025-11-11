import { type FC } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';

type Props = {
    title: string
}
const HeaderDashboardData: FC<Props> = ({ title }) => {

    // navigate 
    const navigate = useNavigate();
    return (
        <div className='w-full flex flex-row justify-center items-center relative'>

            {/* back */}
            <button className='absolute left-0' onClick={() => navigate(-1)}>
                <FaArrowLeft className='text-white text-2xl' />
            </button>

            {/* header */}
            <div className='w-full flex flex-row justify-center items-start'>
                <h2 className='text-white font-bold text-base'>{title}</h2>
            </div>
        </div>
    )
}

export default HeaderDashboardData

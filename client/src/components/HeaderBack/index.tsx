import { type FC } from 'react'
import ButtonBack from '../ButtonBack'
import { useNavigate } from 'react-router-dom'


type Props = {
    label: string;
}
const HeaderBack: FC<Props> = ({ label }) => {

    // navigate 
    const navigate = useNavigate();


    return (
        <div className='w-full h-12 relative flex flex-row justify-center items-center'>
            {/* nav back */}
            <ButtonBack handleBack={() => navigate(-1)} />

            {/* title */}
            <h2 className='text-white text-base capitalize font-semibold'>
                {label}
            </h2>
        </div>
    )
}

export default HeaderBack

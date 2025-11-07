import { type FC } from 'react'
import loading from '../../assets/animation/loading-black.svg'

// Props 
type Props = {
    label: string;
    isPending?: boolean;
}


const ButtonSubmit: FC<Props> = ({ label, isPending }) => {
    return (
        <button type='submit' disabled={isPending} className='w-full bg-white rounded-full h-14 flex flex-row justify-center items-center font-bold text-black'>
            {isPending ? <img src={loading} alt="loading" className='w-9 h-9' /> : label}
        </button>
    )
}

export default ButtonSubmit

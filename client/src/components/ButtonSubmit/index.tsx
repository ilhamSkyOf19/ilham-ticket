import { type FC } from 'react'

// Props 
type Props = {
    label: string;
    isPending?: boolean;
}


const ButtonSubmit: FC<Props> = ({ label, isPending }) => {
    return (
        <button type='submit' disabled={isPending} className='w-full bg-white rounded-full py-3.5 flex flex-row justify-center items-center font-bold text-black'>
            {label}
        </button>
    )
}

export default ButtonSubmit

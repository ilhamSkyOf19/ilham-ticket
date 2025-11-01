import { type FC } from 'react'
import { GoTrash } from 'react-icons/go'

const ButtonDeleteTrash: FC = () => {
    return (
        <div className='absolute top-3 right-3 z-10'>
            <button type="button" className='group'>
                <GoTrash className='text-white text-xl group-hover:text-red-500 transition-colors duration-200 ease-in-out' />
            </button>
        </div>
    )
}

export default ButtonDeleteTrash

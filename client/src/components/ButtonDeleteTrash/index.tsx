import { type FC } from 'react'
import { GoTrash } from 'react-icons/go'

type Props = {
    handleDelete: () => void;
}
const ButtonDeleteTrash: FC<Props> = ({ handleDelete }) => {
    return (
        <div className='absolute top-4 right-4 z-10'>
            <button type="button" className='group' onClick={handleDelete}>
                <GoTrash className='text-white text-xl group-hover:text-red-500 transition-colors duration-200 ease-in-out' />
            </button>
        </div>
    )
}

export default ButtonDeleteTrash

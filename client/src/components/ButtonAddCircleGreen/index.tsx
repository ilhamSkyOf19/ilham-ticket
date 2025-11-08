import { type FC } from 'react'
import { IoMdAdd } from 'react-icons/io'
import { Link } from 'react-router-dom'

// Props
type Props = {
    link: string;
}

const ButtonAddCircleGreen: FC<Props> = ({ link }) => {
    return (
        <Link to={link} className='w-13 h-13 bg-green-700 rounded-full fixed z-20 bottom-6 right-6 flex flex-col justify-center items-center'>
            <IoMdAdd className='text-white text-4xl' />
        </Link>
    )
}

export default ButtonAddCircleGreen

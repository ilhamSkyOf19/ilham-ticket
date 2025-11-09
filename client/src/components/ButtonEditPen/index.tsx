import { type FC } from 'react'
import { BiEdit } from "react-icons/bi";
import { Link } from 'react-router-dom';

// props
type Props = {
    link: string;
}

const ButtonEditPen: FC<Props> = ({ link }) => {
    return (
        <Link to={link} className='absolute top-3.5 right-14 group z-10'>
            <BiEdit className='text-white text-2xl group-hover:text-blue-500 transition-colors duration-200 ease-in-out' />
        </Link>
    )
}

export default ButtonEditPen

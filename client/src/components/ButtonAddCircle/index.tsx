import { type FC } from 'react'
import { IoIosAdd } from 'react-icons/io';
import { Link } from 'react-router-dom';

type Props = {
    link: string;
}
const ButtonAddCircle: FC<Props> = ({ link }) => {
    return (
        <Link to={link}>
            <div className='w-8 h-8 bg-green-700 rounded-full flex flex-col justify-center items-center group hover:scale-110 transition-all duration-300 ease-in-out'>
                <IoIosAdd className='text-white w-full h-full text-center' />
            </div>
        </Link>
    )
}

export default ButtonAddCircle

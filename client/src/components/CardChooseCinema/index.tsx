import { type FC } from 'react'
import ComponentInfo from '../ComponentInfo';
import iconLocation from '../../assets/images/icons/location.svg';
import clsx from 'clsx';


type Props = {
    handleClickTheater: (id: number) => void;
    theater: { id: number; title: string; location: string };
    active?: boolean;
    error?: string;
}

const CardChooseCinema: FC<Props> = ({ handleClickTheater, theater, active, error }) => {
    return (
        <button type='button' onClick={() => handleClickTheater
            (theater.id)} key={theater.id} className={clsx(
                'w-[8rem] h-[6rem] bg-white/10 rounded-2xl flex flex-col justify-start items-start px-3 py-3 gap-3 transition-all duration-200 ease-in-out hover:bg-white/20',
                active ? 'border-2 border-blue-500' : error ? 'border-2 border-red-500' : 'border-2 border-transparent',

            )}>

            {/* title theater */}
            <h3 className='text-white text-xs font-medium text-left'>
                {theater.title}
            </h3>

            {/* location */}
            <ComponentInfo
                icon={iconLocation}
                label={theater.location}
            />
        </button>
    )
}

export default CardChooseCinema

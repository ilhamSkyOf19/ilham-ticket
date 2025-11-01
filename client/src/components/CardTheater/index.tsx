import { type FC } from 'react'
import type { TheatersType } from '../../types/types'
import clsx from 'clsx';
import { useMatch } from 'react-router-dom';
import ButtonDeleteTrash from '../ButtonDeleteTrash';


type Props = TheatersType & {
    choose?: boolean;
    active?: number;
    selected?: (id: number) => void;
    warning?: boolean
};
const CardTheater: FC<Props> = ({ id, thumbnail, name, location, choose, active, selected, warning }) => {

    // cek admin with path 
    const admin = useMatch('/dashboard/dashboard-movie-detail/:id');
    return (
        <button type='submit' disabled={!choose} className={clsx(
            'w-full h-[8.5rem]  flex flex-row justify-start items-start gap-4 px-4.5 py-3.5 rounded-3xl text-left transition duration-300 ease-in-out relative',
            choose && (active === id) ? 'bg-blue-800' : 'bg-white/10',
            warning && !active ? 'border-2 border-red-500' : 'border-2 border-transparent'
        )}

            onClick={() => selected && selected(id)}>

            {/* button trash */}
            {
                admin && (
                    <ButtonDeleteTrash />
                )
            }


            {/* thumbnail */}
            <div className='flex-1 h-full rounded-2xl overflow-hidden'>
                <img src={thumbnail} alt="thumbnail" className='w-full h-full object-cover' loading='lazy' />
            </div>

            {/* description */}
            <div className='flex-2/5 h-full flex flex-col justify-center items-start gap-2'>
                {/* name */}
                <h3 className='text-white text-base font-semibold'>
                    {name}
                </h3>

                {/* location */}
                <p className='text-slate-300 text-sm'>
                    {location}
                </p>
            </div>
        </button>
    )
}

export default CardTheater

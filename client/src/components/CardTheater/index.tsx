import { type FC } from 'react'
import type { TheatersType } from '../../types/types'
import clsx from 'clsx';


type Props = TheatersType & {
    choose?: boolean;
    active?: number;
    selected?: (id: number) => void
};
const CardTheater: FC<Props> = ({ id, thumbnail, name, location, choose, active, selected }) => {
    return (
        <button type='submit' disabled={!choose} className={clsx(
            'w-full h-[8.5rem]  flex flex-row justify-start items-start gap-4 px-4.5 py-3.5 rounded-3xl text-left',
            choose && (active === id) ? 'bg-blue-800' : 'bg-white/10'
        )}

            onClick={() => selected && selected(id)}>
            {/* thumbnail */}
            <div className='flex-1 h-full rounded-2xl overflow-hidden'>
                <img src={thumbnail} alt="thumbnail" className='w-full h-full object-cover' />
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

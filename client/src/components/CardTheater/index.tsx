import { type FC } from 'react'
import type { TheatersType } from '../../types/types'


type Props = TheatersType;
const CardTheater: FC<Props> = ({ thumbnail, name, location }) => {
    return (
        <div className='w-full h-[9rem] bg-white/10 flex flex-row justify-start items-start gap-4 px-4 py-3 rounded-3xl '>
            {/* thumbnail */}
            <div className='flex-1 h-full rounded-2xl overflow-hidden'>
                <img src={thumbnail} alt="thumbnail" className='w-full h-full object-cover' />
            </div>

            {/* description */}
            <div className='flex-2 h-full flex flex-col justify-center items-start gap-2'>
                {/* name */}
                <h3 className='text-white text-base font-semibold'>
                    {name}
                </h3>

                {/* location */}
                <p className='text-slate-300 text-sm'>
                    {location}
                </p>
            </div>
        </div>
    )
}

export default CardTheater

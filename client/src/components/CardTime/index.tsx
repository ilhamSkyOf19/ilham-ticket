import { type FC } from 'react'
import { formatOnlyDate } from '../../helpers/formated'
import clsx from 'clsx';


type Props = {
    id: number;
    status: 'available' | 'full';
    time: string;
    date: Date;
    selected: (id: number) => void;
    active: boolean
}
const CardTime: FC<Props> = ({ id, status, time, date, selected, active }) => {
    return (
        <button type='button' disabled={status === 'full'} className={clsx(
            'w-full rounded-3xl',
            active ? 'bg-blue-800' : status === 'full' ? 'bg-white/8' : 'bg-white/20',
        )}
            onClick={() => selected(id)}
        >
            <div className={clsx(
                'w-full h-full flex flex-col justify-start items-start gap-2 p-4',
                status === 'full' && 'opacity-20'
            )}>
                {/* status */}
                <p className='text-white text-xs font-semibold text-left'>
                    {status}
                </p>

                {/* time */}
                <h4 className='text-white font-bold text-2xl text-left'>
                    {time}
                </h4>

                {/* date  */}
                <p className='text-white text-xs text-left'>
                    {
                        formatOnlyDate(date ?? new Date())
                    }
                </p>
            </div>
        </button>
    )
}

export default CardTime

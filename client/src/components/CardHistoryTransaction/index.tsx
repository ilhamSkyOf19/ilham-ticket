import { type FC } from 'react'

// thumbnail
import noteFavorite from '../../assets/images/icons/note-favorite.svg'
import { FormatIDR } from '../../helpers/formated'
import clsx from 'clsx'
import cards from '../../assets/images/icons/cards.svg'


// props
type Props = {
    plus: boolean
    nominal: number;
    name: string;
    thumbnail?: string;
    status: 'success' | 'failed'
    date: string
}

const CardHistoryTransaction: FC<Props> = ({ plus, nominal, name, thumbnail, status, date }) => {
    return (
        <div className='w-full flex flex-row justify-between items-center overflow-hidden'>
            {/* thumbnail, name, nominal */}
            <div className='flex-2 flex flex-row justify-start items-center gap-3'>
                {/* thumbnail */}
                <div className={clsx(
                    'h-[5.5rem] w-[6.5rem] rounded-2xl overflow-hidden flex flex-col justify-center items-center',
                    !plus && 'bg-white/10'
                )}>
                    <img src={thumbnail ?? cards} alt="thumbnail" className={clsx(
                        plus ? 'object-cover w-full h-full' : 'w-9 h-9'
                    )} />

                </div>

                <div className='flex flex-col justify-center items-start gap-2'>
                    {/* name */}
                    <h2 className='text-white font-semibold text-base capitalize'>{name}</h2>

                    {/* nominal */}
                    <div className='w-full flex flex-row justify-start items-start gap-2'>
                        {/* icon */}
                        <img src={noteFavorite} alt="icon note" className='w-4.5 h-4.5' />

                        {/* nominal */}
                        <Nominal plus={plus} nominal={nominal} />
                    </div>
                </div>
            </div>

            {/* ket */}
            <div className='flex-1 flex flex-col justify-center items-end gap-2'>
                <h2 className={clsx(
                    'uppercase text-xs py-1.5 px-2 rounded-full font-medium',
                    status === 'success' ? 'text-green-700 bg-green-200' : 'text-red-500 bg-red-200'
                )}>
                    {status}
                </h2>

                {/* date */}
                <p className='text-xs text-slate-200 italic font-light'>
                    {date}
                </p>
            </div>
        </div>
    )
}


// nominal mines
type NominalProps = {
    plus: boolean;
    nominal: number;
}

const Nominal: FC<NominalProps> = ({ plus, nominal }) => {
    return (
        <div className='flex flex-row justify-start items-start'>
            {/* plus */}
            <p className={clsx(
                'text-sm',
                plus ? 'text-green-500' : 'text-red-500'
            )}>
                <span className='mr-0.5'>
                    {plus ? '+' : '-'}
                </span>
                <span>{FormatIDR(nominal)}</span>
            </p>

        </div>
    )
}

export default CardHistoryTransaction

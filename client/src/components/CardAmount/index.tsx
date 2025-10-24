import clsx from 'clsx';
import { type FC } from 'react'
import { formatIDR } from '../../helpers/formated';


type Props = {
    currency: string;
    value: number;
    handleChoose: (value: number) => void;
    active: boolean;
}
const CardAmount: FC<Props> = ({ currency, value, active, handleChoose }) => {
    return (
        <button type='button' onClick={() => handleChoose(value)} className={clsx(
            'w-full h-[5rem] rounded-3xl flex flex-col justify-between items-start p-3.5 transition-all duration-300 ease-in-out',
            active ? 'bg-blue-800' : 'bg-white/15'
        )}>
            {/* currency */}
            <p className='text-white font-bold text-base'>
                {currency}
            </p>

            {/* value */}
            <h2 className='text-white font-bold text-base'>
                {formatIDR(value).replace(/[^\d.,]/g, '')}
            </h2>
        </button>
    )
}

export default CardAmount

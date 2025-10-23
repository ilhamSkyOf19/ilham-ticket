import { type FC } from 'react'
import clsx from 'clsx'
import { formatIDR } from '../../helpers/formated';

type Props = {
    price: number;
    handleContinue: () => void;
    labelPrice: string;
    labelButton: string;
    col?: boolean;
}
const ButtonPayment: FC<Props> = ({ price, handleContinue, labelPrice, labelButton, col }) => {
    return (
        <div className='w-full flex flex-col justify-start items-center fixed bottom-6 left-0 z-20'>
            <div className='w-[80%] rounded-full bg-white/10 flex flex-row justify-between items-center pl-8 pr-3.5 py-3 backdrop-blur-md'>
                {/* total price */}
                <div className={clsx(
                    'flex-2 flex flex-wrap gap-1',
                    col ? 'flex-col justify-start items-start' : 'flex-row justify-start items-center'
                )}>
                    <h4 className={clsx(
                        'text-white font-bold',
                        price.toString().length >= 7 ? 'text-lg' : 'text-xl'


                    )}>
                        {formatIDR(price)}
                    </h4>

                    <p className='text-white text-base font-semibold'>
                        {labelPrice}
                    </p>
                </div>

                {/* continue */}
                <button type='button' className='flex-1 flex flex-col justify-end items-center  rounded-full bg-white py-3 px-3 font-bold' onClick={handleContinue}>
                    {labelButton}
                </button>
            </div>
        </div>
    )
}

export default ButtonPayment

import { type FC } from 'react'


// default 
import iconDefault from '../../assets/images/icons/receipt-2.svg'
import clsx from 'clsx';
import Status from '../Status';

// Props
type Props = {
    icon: string;
    label: string;
    value: string | Date;
    orange?: boolean;
    status?: 'success' | 'failed'
}
const DataDetail: FC<Props> = ({ icon, label, value, orange, status }) => {
    return (
        <div className='w-full flex flex-row justify-between items-center'>
            {/* icon & label */}
            <div className='flex flex-row justify-start items-center gap-2'>
                {/* icon */}
                <img src={icon ?? iconDefault} alt="icon" className='w-6 h-6' />


                {/* label */}
                <h2 className='text-white text-sm capitalize'>{label}</h2>
            </div>


            {/* value */}
            {
                status ? (
                    <Status status={status} />
                ) : (

                    <h2 className={clsx('font-semibold  capitalize text-right', orange ? 'text-orange-400 text-base' : 'text-white text-sm')}>{value.toLocaleString()}</h2>
                )
            }
        </div>
    )
}

export default DataDetail

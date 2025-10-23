import { type FC } from 'react'
import iconSeat from '../../assets/images/icons/seat.svg'
import iconSeatChoosed from '../../assets/images/icons/seat-choosed.svg'
import clsx from 'clsx';



type Props = {
    label: string;
    active: boolean;
    handleChoose: () => void;
    booked: boolean

}
const Seat: FC<Props> = ({ label, active, handleChoose, booked }) => {
    return (
        <button type='button' disabled={booked} className='w-full h-12 flex flex-col justify-center items-center relative ' onClick={handleChoose}>
            {/* icon seat */}
            <img src={iconSeat} alt="icon seat" className={clsx(
                'w-10 h-10 transition-all duration-300 ease-in-out absolute',
                active && !booked ? 'opacity-0' : !active && !booked ? 'opacity-100' : 'opacity-50',

            )} />
            <img src={iconSeatChoosed} alt="icon seat" className={clsx(
                'w-11 h-11 transition-all duration-300 ease-in-out absolute',
                active ? 'opacity-100' : 'opacity-0'
            )} />

            {/* label */}
            <div className='w-full h-full flex flex-col justify-center items-center pb-2 z-10'>
                <p className={clsx(
                    'text-sm font-semibold transition-all duration-300 ease-in-out',
                    active ? 'text-white' : 'text-black'
                )}>
                    {label}
                </p>
            </div>
        </button>
    )
}

export default Seat

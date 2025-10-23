import { useState, type FC } from 'react'
import clsx from 'clsx';
import DataDetail from '../../components/DataDetail';

// icon 
import iconDown from '../../assets/images/icons/arrow-circle-down.svg'

import receipt from '../../assets/images/icons/receipt-2.svg'
import calendar from '../../assets/images/icons/calendar-2.svg'
import profile2 from '../../assets/images/icons/profile-2user.svg'
import ticketStart from '../../assets/images/icons/ticket-star.svg'
import ticketExpired from '../../assets/images/icons/ticket-expired.svg'
import coffe from '../../assets/images/icons/coffee-white.svg'
import price from '../../assets/images/icons/dollar-circle.svg'
import subTotal from '../../assets/images/icons/receipt-item.svg'
import iconPpn from '../../assets/images/icons/receipt-disscount.svg'
import menuBoard from '../../assets/images/icons/menu-board.svg'
import noteFavorite from '../../assets/images/icons/note-favorite.svg'
import note from '../../assets/images/icons/note.svg'
import dumyThumb from '../../assets/images/thumbnails/th3.png'


type Props = {
    payment: boolean;
}
const TicketsDetail: FC<Props> = ({ payment }) => {

    // state active 
    const [active, setActive] = useState(false)


    return (
        <div className={clsx(
            'w-full flex flex-col justify-start items-start p-5 rounded-3xl bg-white/20 transition-all duration-400 overflow-hidden',
            active ? ' max-h-[50rem] ' : 'max-h-[4rem]'
        )}>
            {/* button show */}
            <button type='button' className=' w-full flex flex-row justify-between items-center' onClick={() => setActive(!active)}>

                {/* title */}
                <h2 className='text-white capitalize text-base'>
                    Order Details
                </h2>

                {/* icon */}
                <img src={iconDown} alt="icon arrow" className={clsx(
                    'w-6 h-6 transition-transform duration-400',
                    !active ? '-rotate-180' : 'rotate-0'
                )} />
            </button>


            {/* content details */}
            <div className='w-full h-[5.5rem] flex flex-row justify-start items-start gap-2 mt-6'>
                {/* location cinema */}
                <div className='w-full h-full flex flex-row justify-start items-center gap-2'>
                    {/* thumb */}
                    <div className='flex-1'>
                        <div className='w-[5rem] h-[5.5rem] rounded-2xl overflow-hidden'>
                            <img src={dumyThumb} alt="thumbnail bioskop" className='w-full h-full object-cover' />
                        </div>
                    </div>

                    {/* info cinema */}
                    <div className='flex-3 h-full flex flex-col justify-start items-start gap-2'>
                        {/* name */}
                        <h3 className='text-white text-sm font-semibold'>
                            Angga Park Cinema
                        </h3>

                        {/* address */}
                        <p className='text-slate-400 text-sm'>
                            Jalan Jendral Sudirman No. 20, Jakarta
                        </p>
                    </div>
                </div>


            </div>
            {/* info detail */}
            <div className='w-full flex flex-col justify-start items-start mt-4 gap-5'>
                <DataDetail
                    icon={receipt}
                    label={'Booking ID'}
                    value={'PMRBWA1992'}
                />

                {/* date */}
                <DataDetail
                    icon={calendar}
                    label={'Date & Time'}
                    value={new Date('2025-10-10T14:30:00')}
                />

                {/* quantity */}
                <DataDetail
                    icon={profile2}
                    label={'Quantity'}
                    value={`${2} Seats`}
                />

                {/* seat */}
                <DataDetail
                    icon={ticketStart}
                    label={'Seat'}
                    value={'A1, A2'}
                />

                {/* bonus */}
                <DataDetail
                    icon={coffe}
                    label={'Bonus'}
                    value={'Popcorn 20%'}
                />

                {/* price */}
                <DataDetail
                    icon={price}
                    label={'Price'}
                    value={'Rp 200.000/seat'}
                />


                {/* sub total */}
                <DataDetail
                    icon={subTotal}
                    label={'Sub Total'}
                    value={'Rp 400.000'}
                />

                {/* ppn */}
                <DataDetail
                    icon={iconPpn}
                    label={`PPN ${11}%`}
                    value={'Rp 20.000'}
                />

                {/* booking free */}
                <DataDetail
                    icon={menuBoard}
                    label={'Booking Fee'}
                    value={'Rp 3.000'}
                />


                {/* disscount */}
                <DataDetail
                    icon={ticketExpired}
                    label={'Discount'}
                    value={'Rp 20.000'}
                />

                {/* grand total */}
                <DataDetail
                    icon={noteFavorite}
                    label={'Grand Total'}
                    value={'Rp 420.000'}
                    orange={true}
                />

                {/* status */}
                {
                    !payment && (
                        <DataDetail
                            icon={note}
                            label={'Payment Status'}
                            value={''}
                            status={'success'}
                        />

                    )
                }

            </div>
        </div>
    )
}

export default TicketsDetail

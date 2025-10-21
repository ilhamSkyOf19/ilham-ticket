import { type FC } from 'react'
import type { BonusType } from '../../types/types';
import clsx from 'clsx';
import CardBonus from '../CardBonus';


type Props = {
    bonus: BonusType[];
}
const Bonus: FC<Props> = ({ bonus }) => {
    return (
        <div className='w-full flex flex-col justify-start items-start gap-4'>
            {/* header */}
            <h2 className='text-white font-semibold text-lg capitalize px-4'>
                Bonus Ticket
            </h2>

            {/* bonus */}
            <div className={clsx(
                'w-full flex flex-row items-center',
                bonus.length > 0 ? ' justify-start ' : 'justify-center'
            )}>

                {
                    bonus.length > 0 ? (
                        <div className='w-full flex flex-row justify-start items-start overflow-x-auto gap-4 scrollbar-hide snap-x snap-mandatory'>
                            {/* card bonus */}

                            {/* spacer */}
                            <div className='w-4 snap-start' />

                            {
                                bonus.map((item: BonusType, index: number) => (
                                    <CardBonus key={index} code={item} />
                                ))
                            }

                            {/* spacer */}
                            <div className='w-4 snap-start' />
                        </div>
                    ) : (
                        <p className='text-slate-500 font-semibold'>Tidak Ada Bonus</p>
                    )
                }
            </div>
        </div>
    )
}

export default Bonus

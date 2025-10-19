import { type FC } from 'react'

import thumnDumy from '../../assets/images/thumbnails/th1.png'
import videoPlay from '../../assets/images/icons/video-vertical-white.svg'


const CardComingSoon: FC = () => {
    return (
        <div className='snap-start w-[15rem] h-[17rem] bg-white rounded-3xl relative overflow-hidden'>
            {/* thumbnail */}
            <div className='absolute w-full h-full'>
                <img src={thumnDumy} alt="thumbnail" className='w-full h-full object-cover' />
            </div>

            {/* description */}
            <div className='bg-transparent w-full h-full flex flex-col justify-end items-center px-4 pb-4'>
                <div className='bg-white/10 backdrop-blur-sm w-full h-[4.5rem] rounded-2xl flex flex-row justify-start items-center px-3 gap-2'>
                    {/* icon */}
                    <img src={videoPlay} alt="icon" className='w-8 h-8' />


                    {/* description */}
                    <div className='h-full flex flex-col justify-center items-start'>
                        {/* genre */}
                        <h3 className='text-white text-sm capitalize'>
                            Action
                        </h3>

                        {/* name */}
                        <h2 className='text-white font-semibold text-base'>
                            {
                                ('Avengers: Endgame').length > 13 ? (
                                    ('Avengers: Endgame').slice(0, 13).concat('...')
                                ) : (
                                    ('Avengers: Endgame')
                                )
                            }
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardComingSoon

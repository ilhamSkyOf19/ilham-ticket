import { type FC } from 'react'
import ComponentInfo from '../ComponentInfo'

import th2 from '../../assets/images/thumbnails/th2.png'
import iconVideo from '../../assets/images/icons/video-vertical-grey.svg'
import iconLocation from '../../assets/images/icons/location.svg'
import Rating from '../Rating'
import { useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import ButtonAction from '../ButtonAction'


type Props = {
    disable?: boolean;
    dashboard?: boolean
}
const CardMovie: FC<Props> = ({ disable, dashboard }) => {

    // navigate 
    const navigate = useNavigate();


    return (
        <>
            {dashboard ? (
                <div className={clsx(
                    'w-full flex flex-row justify-between',
                    dashboard ? 'items-start' : 'items-center'
                )}>
                    <div className={clsx(
                        'flex-3/4 flex flex-row justify-start gap-4',
                        dashboard ? 'items-start' : 'items-center'
                    )}>
                        {/* thumbnail */}
                        <div className='bg-white rounded-3xl w-[6.5rem] h-[7.5rem] overflow-hidden'>
                            <img src={th2} alt="thumbnail" className='w-ful h-full object-cover' />
                        </div>

                        <div className='flex-1 flex flex-col justify-start items-start gap-2.5'>
                            <div className={clsx(
                                'w-full flex flex-row justify-start',
                                dashboard ? 'items-start' : 'items-center'
                            )}>
                                {/* description */}
                                <div className='flex-3 h-full flex flex-col justify-center items-start gap-2'>
                                    {/* name */}
                                    <h2 className='text-white font-semibold text-base text-left'>
                                        {
                                            ('Avengers: Endgame').length > 15 ? (
                                                ('Avengers: Endgame').slice(0, 15).concat('...')
                                            ) : (
                                                ('Avengers: Endgame')
                                            )
                                        }
                                    </h2>

                                    {/* genre */}
                                    <ComponentInfo
                                        icon={iconVideo}
                                        label={'Action'}
                                    />

                                    {/* location */}
                                    <ComponentInfo
                                        icon={iconLocation}
                                        label={'Jakarta'}
                                    />
                                </div>
                                {/* rating */}
                                <div className='h-full flex-1 flex flex-col justify-center items-end'>
                                    <Rating rating={8.5} />
                                </div>
                            </div>
                            <div className='w-full flex flex-row justify-start items-center gap-2 flex-wrap'>
                                {/* detail */}
                                <ButtonAction
                                    color='bg-white/30'
                                    label={'Detail'}
                                    handleClick={() => navigate('dashboard-movie-detail/1')}
                                />

                                {/* update */}
                                <ButtonAction
                                    color='bg-blue-600'
                                    label={'Update'}
                                    handleClick={() => { }}
                                />

                                {/* delete */}
                                <ButtonAction
                                    color='bg-red-600'
                                    label={'Delete'}
                                    handleClick={() => { }}
                                />

                            </div>
                        </div>
                    </div>
                </div>

            ) : (
                <button type='button' disabled={disable} onClick={() => navigate('/movie-detail/1')} className={clsx(
                    'w-full flex flex-row justify-between',
                    dashboard ? 'items-start' : 'items-center'
                )}>
                    <div className={clsx(
                        'flex-3/4 flex flex-row justify-start gap-4',
                        dashboard ? 'items-start' : 'items-center'
                    )}>
                        {/* thumbnail */}
                        <div className='bg-white rounded-3xl w-[6.5rem] h-[7.5rem] overflow-hidden'>
                            <img src={th2} alt="thumbnail" className='w-ful h-full object-cover' />
                        </div>

                        <div className='flex-1 flex flex-col justify-start items-start gap-2.5'>
                            <div className={clsx(
                                'w-full flex flex-row justify-start',
                                dashboard ? 'items-start' : 'items-center'
                            )}>
                                {/* description */}
                                <div className='flex-3 h-full flex flex-col justify-center items-start gap-2'>
                                    {/* name */}
                                    <h2 className='text-white font-semibold text-base text-left'>
                                        {
                                            ('Avengers: Endgame').length > 15 ? (
                                                ('Avengers: Endgame').slice(0, 15).concat('...')
                                            ) : (
                                                ('Avengers: Endgame')
                                            )
                                        }
                                    </h2>

                                    {/* genre */}
                                    <ComponentInfo
                                        icon={iconVideo}
                                        label={'Action'}
                                    />

                                    {/* location */}
                                    <ComponentInfo
                                        icon={iconLocation}
                                        label={'Jakarta'}
                                    />
                                </div>
                                {/* rating */}
                                <div className='h-full flex-1 flex flex-col justify-center items-end'>
                                    <Rating rating={8.5} />
                                </div>
                            </div>
                        </div>
                    </div>

                </button>
            )}
        </>
    )
}

export default CardMovie

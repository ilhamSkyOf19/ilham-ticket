import { type FC } from 'react'
import ComponentInfo from '../ComponentInfo'

import th2 from '../../assets/images/thumbnails/th2.png'
import iconVideo from '../../assets/images/icons/video-vertical-grey.svg'
import iconLocation from '../../assets/images/icons/location.svg'
import Rating from '../Rating'
import { useNavigate } from 'react-router-dom'


type Props = {
    disable?: boolean
}
const CardMovie: FC<Props> = ({ disable }) => {

    // navigate 
    const navigate = useNavigate();


    return (
        <button type='button' disabled={disable} onClick={() => navigate('/movie-detail/1')} className='w-full flex flex-row justify-between items-center'>
            <div className='flex-3/4 flex flex-row justify-start items-center gap-4'>
                {/* thumbnail */}
                <div className='bg-white rounded-3xl w-[6.5rem] h-[7.5rem] overflow-hidden'>
                    <img src={th2} alt="thumbnail" className='w-ful h-full object-cover' />
                </div>

                {/* description */}
                <div className='h-full flex flex-col justify-center items-start gap-2'>
                    {/* name */}
                    <h2 className='text-white font-semibold text-base'>
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
            </div>


            {/* rating */}
            <div className='flex-1 h-full flex flex-col justify-center items-end'>
                <Rating rating={8.5} />
            </div>
        </button>
    )
}

export default CardMovie

import { type FC } from 'react'

// thumb
import thumbDefault from '../../assets/images/thumbnails/th3.png'
import iconVideo from '../../assets/images/icons/video-vertical-grey.svg'
import locationIcon from '../../assets/images/icons/location.svg'
import iconCalendar from '../../assets/images/icons/calendar-2-grey.svg'
import { formatDate } from '../../helpers/formated'
import Status from '../Status'
import { Link } from 'react-router-dom'
import clsx from 'clsx'

// props
type Props = {
    id: number;
    thumbnail: string;
    name: string;
    genre: string;
    location: string;
    date: Date;
    status: 'success' | 'failed';
    detail?: boolean;
}


const CardTicket: FC<Props> = ({ id, thumbnail, name, genre, location, date, status, detail }) => {
    return (
        <Link to={`/ticket/${id}`} className={clsx(
            'w-full flex flex-row justify-start gap-3',
            detail ? 'items-center' : 'items-start'
        )}>
            {/* thumbnail */}
            <div className='flex-1'>
                <div className='w-[6.5rem] h-[7.5rem] rounded-2xl overflow-hidden'>
                    <img src={thumbnail ?? thumbDefault} alt="thumbnail" className='w-full h-full object-cover' loading='lazy' />
                </div>
            </div>


            {/* info */}
            <div className='flex-3 flex flex-col justify-start items-start gap-2'>
                {/* name */}
                <h3 className='text-white font-semibold text-lg'>{name}</h3>

                {/* genre & location */}
                <div className='flex flex-row justify-start items-start gap-2'>
                    {/* genre */}
                    <ComponentInfo icon={iconVideo} label={genre} />

                    {/* location */}
                    <ComponentInfo icon={locationIcon} label={location} />
                </div>

                {
                    !detail && (
                        <>
                            {/* date */}
                            <ComponentInfo icon={iconCalendar} label={formatDate(date)} />

                            {/* status */}
                            <Status status={status} />
                        </>
                    )
                }

            </div>

        </Link>
    )
}


// component info
type ComponentInfoProps = {
    icon: string;
    label: string;
}
const ComponentInfo: FC<ComponentInfoProps> = ({ icon, label }) => {
    return (
        <div className='flex flex-row justify-start items-center gap-2'>
            {/* icon */}
            <img src={icon} alt="icon" className='w-5 h-5' />

            {/* label */}
            <p className='text-slate-300 text-sm font-extralight tracking-wider'>{label}</p>

        </div>
    )
}


export default CardTicket

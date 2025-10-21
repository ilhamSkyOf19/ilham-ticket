import { type FC } from 'react'
import iconStar from '../../assets/images/icons/star.svg'
import clsx from 'clsx';

type Props = {
    rating: number;
    size?: 'md';
}
const Rating: FC<Props> = ({ rating, size }) => {
    return (
        <div className={clsx(
            'w-full flex flex-row justify-center items-start gap-1 bg-white/10 rounded-full',
            size === 'md' ? 'py-3 px-5' : 'py-1.5 px-4'
        )}>
            <p className={clsx(
                'text-white font-semibold ',
                size === 'md' ? 'text-sm' : 'text-xs'
            )}>{rating}</p>
            {/* icon start */}
            <img src={iconStar} alt="icon start" className={clsx(size === 'md' ? 'w-4.5 h-4.5' : 'w-3 h-3')} />
        </div>
    )
}

export default Rating

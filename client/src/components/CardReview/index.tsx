import { type FC } from 'react'
import type { ReviewsType } from '../../types/types'
import iconStar from '../../assets/images/icons/star.svg'


type Props = ReviewsType;
const CardReview: FC<Props> = ({ author, comments, rating }) => {
    return (
        <div className='w-full rounded-3xl bg-white/10 flex flex-col justify-start items-start py-4 px-5 gap-3'>
            {/* rating */}
            <div className='w-full flex flex-row justify-start items-start gap-1'>
                {
                    Array.from({ length: rating }, (_, i) => (
                        <img key={i} src={iconStar} alt="icon start" className='w-6 h-6' />
                    ))
                }
            </div>


            {/* comments */}
            {
                comments.length > 0 ? (
                    <p className='text-white text-base font-light'>{comments}</p>
                ) : (
                    <p className='text-white text-base font-light'>No Comments</p>
                )
            }

            {/* author */}
            <p className='text-white text-base font-semibold'>{author}</p>
        </div>
    )
}

export default CardReview

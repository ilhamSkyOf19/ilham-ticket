import { type FC } from 'react'
import clsx from 'clsx';
import type { ReviewsType } from '../../types/types';
import CardReview from '../CardReview';
// review 
type PropsReview = {
    reviews: ReviewsType[];
};
const Review: FC<PropsReview> = ({ reviews }) => {



    return (
        <div className='w-full flex flex-col justify-start items-start gap-5'>
            {/* title */}
            <h3 className='text-white text-base font-semibold'>
                Customer Reviews
            </h3>


            {/* comments */}
            <div className={clsx(
                'w-full flex flex-col justify-start gap-4.5',
                reviews.length > 0 ? 'items-start' : 'items-center'
            )}>
                {/* card review */}
                {
                    reviews.length > 0 ? (
                        reviews.map((item: ReviewsType, index: number) => (

                            <CardReview key={index} ReviewsType={item} />
                        ))
                    ) : (
                        <h3 className='text-white/50 text-base font-semibold'>
                            No Reviews
                        </h3>
                    )
                }
            </div>
        </div>
    )
}

export default Review

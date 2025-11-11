import type { FC } from "react";
import ComponentInfo from "../ComponentInfo";
import iconVideo from '../../assets/images/icons/video-vertical-white.svg'
import iconLocation from '../../assets/images/icons/location.svg'
import Rating from '../Rating';


// component about 
type Props = {
    content: string;
    rating: number;
    genre: string;
    city: string;
}
const About: FC<Props> = ({ content, rating, genre, city }) => {
    return (
        <div className='w-full flex flex-col justify-start items-start gap-2'>
            {/* title */}
            <h3 className='text-white text-base font-semibold'>
                About
            </h3>

            {/* content */}
            <p className='text-base text-white font-light text-left mb-4'>
                {
                    content ?? 'Legendary sci-fi film series set in a galaxy far, far away, blending epic space battles, mystical powers, and iconic characters the original film, released in 1977 and later on.'
                }
            </p>

            {/* info */}
            <div className='w-full flex flex-row justify-start items-center gap-4'>
                {/* genre */}
                <ComponentInfo icon={iconVideo} label={genre} background={true} />

                {/* location */}
                <ComponentInfo icon={iconLocation} label={city} background={true} />

                {/* rating */}
                <div className='w-18'>
                    <Rating rating={rating} size='md' />
                </div>
            </div>


        </div>
    )
}


export default About
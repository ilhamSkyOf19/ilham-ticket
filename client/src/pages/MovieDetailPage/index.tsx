import { useState, type FC } from 'react'
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import ButtonBack from '../../components/ButtonBack';
import bgDumy from '../../assets/images/backgrounds/details.png'
import theaterDumy from '../../assets/images/thumbnails/theater1.png'
import heart from '../../assets/images/icons/heart.svg'
import iconVideoPlay from '../../assets/images/icons/video-circle.svg'
import iconVideo from '../../assets/images/icons/video-vertical-white.svg'
import iconLocation from '../../assets/images/icons/location.svg'
import clsx from 'clsx';
import ComponentInfo from '../../components/ComponentInfo';
import Rating from '../../components/Rating';
import Bonus from '../../components/Bonus';
import { formatIDR } from '../../helpers/formated';
import type { MovieType } from '../../models/movie-model';
import type { ReviewsType } from '../../types/types';
import CardReview from '../../components/CardReview';
import ListTheater from '../../components/ListTheater';


// Props

const MovieDetailPage: FC = () => {

    // data 
    const data = useLoaderData() as MovieType;

    // state section 
    const [sectionState, setSectionState] = useState<string>('about');

    // navigate 
    const navigate = useNavigate();


    // list button 
    const section: string[] = ['about', 'review', 'theaters', 'cast'];




    return (
        <div className='w-full min-h-[100vh] flex flex-col justify-start items-start overflow-hidden bg-black'>
            {/* background */}
            <div className='w-full fixed'>
                <img src={data?.thumbnail ?? bgDumy} alt="background" className='w-full h-full object-cover' />
            </div>


            {/* content */}
            <div className='w-full flex flex-col justify-start items-start h-full relative'>

                {/* shadow */}
                <div className='w-full h-[55vh] bg-transparent flex flex-col justify-end items-center'>
                    <div className='w-full bg-gradient-to-t from-black to-transparent z-10 h-[40%]' />
                </div>




                {/* header */}
                <div className='w-full flex flex-row justify-between items-center absolute top-12 z-20 px-4'>
                    {/* back */}
                    <div className='relative'>
                        <ButtonBack handleBack={() => navigate(-1)} absolute={false} />
                    </div>

                    {/* title */}
                    <h2 className='capitalize font-bold text-white text-base'>
                        movie details
                    </h2>

                    {/* heart */}
                    <button type='button' className=
                        ' w-12 h-12 flex flex-row justify-center items-center bg-white/30 rounded-full'
                        onClick={() => { }}>
                        <img src={heart} alt="icon heart" className='w-6 h-6' loading='lazy' />
                    </button>
                </div>


                <div className='w-full h-full flex flex-col justify-start items-start z-20 -mt-0.5 bg-black pb-40 gap-6'>
                    <div className='w-full flex flex-col justify-start items-start px-4 gap-6 -mt-12'>
                        <div className='w-full flex flex-row justify-between items-center'>
                            {/* title */}
                            <h2 className='flex-3/5 text-white font-bold text-3xl'>
                                {data?.title ?? 'Start Wars 3'}
                            </h2>

                            {/* icon play */}
                            <div className='flex-1 flex flex-col justify-center items-end'>
                                <div className='w-15 h-15 bg-white/10 rounded-full flex flex-col justify-center items-center'>
                                    <img src={iconVideoPlay} alt="icon video play" className='w-9 h-9' />
                                </div>
                            </div>
                        </div>

                        {/* section */}
                        <div className='w-full flex flex-row justify-start items-start gap-2 overflow-x-auto'>
                            {/* button section */}
                            {
                                section.map((item: string, index: number) => (
                                    <button key={index} type='button' className={clsx(
                                        ' font-semibold text-sm capitalize px-4.5 py-3.5 rounded-full transition-all duration-300 ease-in-out',
                                        sectionState === item ? 'bg-white text-black' : 'bg-white/10 text-white'
                                    )} onClick={() => setSectionState(item)}>
                                        {item}
                                    </button>
                                ))
                            }
                        </div>
                        {
                            sectionState === 'about' ?
                                <About content={data?.about} rating={data?.rating ?? 8.5} /> : sectionState === 'review' ?
                                    <Review reviews={data?.reviews ?? [
                                        {
                                            author: 'John Doe',
                                            rating: 5,
                                            comments: 'Keren banget film nya recomended'
                                        },
                                        {
                                            author: 'Robert Doe',
                                            rating: 4,
                                            comments: 'Memang filmnya keren tapi gak keren banget'
                                        },
                                        {
                                            author: 'Justina Doe',
                                            rating: 5,
                                            comments: 'this is the best movie ever'
                                        },
                                    ]} /> : sectionState === 'theaters' ?
                                        <ListTheater theaters={data?.theaters ?? [
                                            {
                                                id: 1,
                                                thumbnail: theaterDumy,
                                                name: 'Cinema 1',
                                                location: 'Jln Soekarno Hatta, Jakarta Selatan, Cinema lantai 2'
                                            },
                                            {
                                                id: 1,
                                                thumbnail: theaterDumy,
                                                name: 'Cinema 1',
                                                location: 'Jln Soekarno Hatta, Jakarta Selatan, Cinema lantai 2'
                                            }
                                        ]} /> : null
                        }
                    </div>

                    {/* bonus */}
                    <div className='w-full'>
                        {/* bonus */}
                        <Bonus bonus={data?.bonus ?? ['M1', 'PS1', 'PS3']} />
                    </div>
                </div>
            </div>

            {/* pricing */}
            <div className='w-full fixed bottom-0 py-4 flex flex-col justify-center items-center z-20'>
                <div className='w-[90%] h-[4.5rem] bg-white/10 backdrop-blur-sm rounded-full flex flex-row justify-between items-center pl-6 pr-3 py-2.5'>
                    {/* price */}
                    <h2 className='text-white font-semibold text-xl'>
                        {formatIDR(data?.price ?? 50000)} / Person
                    </h2>


                    {/* button */}
                    <Link to={'/choose-theater/1'} className='text-base font-bold text-black h-full flex justify-center items-center px-4 bg-white rounded-full capitalize'>
                        buy ticket
                    </Link>
                </div>
            </div>
        </div>
    )
}


// component about 
type PropsAbout = {
    content: string;
    rating: number;
}
const About: FC<PropsAbout> = ({ content, rating }) => {
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
                <ComponentInfo icon={iconVideo} label={'Action'} background={true} />

                {/* location */}
                <ComponentInfo icon={iconLocation} label={'Jakarta'} background={true} />

                {/* rating */}
                <div className='w-18'>
                    <Rating rating={rating} size='md' />
                </div>
            </div>


        </div>
    )
}


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

                            <CardReview key={index} rating={item.rating} author={item.author} comments={item.comments} />
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



export default MovieDetailPage

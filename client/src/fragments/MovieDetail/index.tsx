import { useState, type FC } from 'react'
import { useLoaderData, useMatch, useNavigate } from 'react-router-dom';
import ButtonBack from '../../components/ButtonBack';
import theaterDumy from '../../assets/images/thumbnails/theater1.png'
import heart from '../../assets/images/icons/heart.svg'
import iconVideoPlay from '../../assets/images/icons/video-circle.svg'
import clsx from 'clsx';
import Bonus from '../../components/Bonus';
import type { MovieType } from '../../models/movie-model';
import ListTheater from '../../components/ListTheater';
import bgDummy from '../../assets/images/thumbnails/th2.png'
import About from '../../components/MovieAbout';
import Review from '../../components/MovieReview';



// props 
// type Props = {
//     data?: string;

// }

const MovieDetail: FC = () => {
    // data 
    const data = useLoaderData() as MovieType;

    // state section 
    const [sectionState, setSectionState] = useState<string>('about');

    // navigate 
    const navigate = useNavigate();


    // list button 
    const section: string[] = ['about', 'review', 'theaters', 'bonus'];


    // check admin with path
    const admin = useMatch('/dashboard/dashboard-movie-detail/:id');


    return (
        <>
            {/* thumbnail */}
            <div className='w-full fixed'>
                <img src={data?.thumbnail ?? bgDummy} alt="background" className='w-full h-[55vh] object-cover' />
            </div>


            <div className='w-full flex flex-col justify-start items-start h-full relative'>

                {/* shadow */}
                <div className='w-full h-[55vh] bg-transparent flex flex-col justify-end items-center relative'>
                    <div className='w-full bg-gradient-to-b from-black to-transparent z-10 h-[30%] fixed top-0' />
                    <div className='w-full bg-gradient-to-t from-black to-transparent z-10 h-[40%] bottom-0' />
                </div>




                {/* header */}
                {
                    !admin && (
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
                    )
                }


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
                                        ]} /> : (sectionState === 'bonus' && admin) ? (
                                            <Bonus bonus={data?.bonus ?? ['M1', 'PS1', 'PS3']} />
                                        ) : null
                        }
                    </div>


                    {/* bonus */}
                    {
                        !admin && (
                            <div className='w-full'>
                                {/* bonus */}
                                <Bonus bonus={data?.bonus ?? ['M1', 'PS1', 'PS3']} />
                            </div>
                        )
                    }
                </div>
            </div>
        </>


    )
}

export default MovieDetail

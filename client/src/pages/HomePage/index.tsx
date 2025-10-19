import { type FC } from 'react'
import SearchBox from '../../components/SearchBox'
import { useForm } from 'react-hook-form'
import { SearchValidation } from '../../validations/search-validation'
import { zodResolver } from '@hookform/resolvers/zod'
import type { SearchModel } from '../../models/search-model'
import clsx from 'clsx'
import CardHighlightMovie from '../../components/CardHighlightMovie'

// profile dumy 
import dumy from '../../assets/images/photos/dumy.png'
import domyThhumbnail from '../../assets/images/thumbnails/th1.png'
import domyThhumbnail2 from '../../assets/images/thumbnails/th3.png'
import iconNotification from '../../assets/images/icons/notification-bell.svg'
import CardMovie from '../../components/CardMovie'

const HomePage: FC = () => {
    // genre 
    const genre: string[] = ['All', 'Animation', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Romance', 'Thriller']


    // use hook form 
    const { register, watch, setValue } = useForm<SearchModel>({
        values: {
            keyword: '',
            genre: 'All'
        },
        resolver: zodResolver(SearchValidation.SEARCH)
    })


    // cek keyword
    // useEffect(() => {
    //     console.log(watch('keyword'));
    // }, [watch('keyword')])





    return (
        <div className='w-full flex flex-col justify-start items-start px-6 gap-6'>
            {/* header */}
            <HeaderComponent />


            {/* thumbnails film slide */}
            <div className='w-full overflow-x-auto scrollbar-hide flex flex-row justify-start items-start gap-4 snap-x snap-mandatory'>
                {/* thumbnails Movie */}
                <CardHighlightMovie thumbnail={domyThhumbnail} />
                <CardHighlightMovie thumbnail={domyThhumbnail2} />
            </div>


            {/* search box */}
            <div className='w-full '>
                <SearchBox register={register('keyword')} />
            </div>

            {/* genre */}
            <div className='w-full flex flex-col justify-start items-start gap-2'>
                {/* title */}
                <h2 className='text-white font-semibold text-lg'>
                    Browse Genre
                </h2>

                {/* list genre */}
                <div className='w-full flex flex-row justify-start items-start gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide'>
                    {
                        genre.map((label, index: number) => (
                            <GenreComponent
                                active={label === watch('genre')}
                                key={index}
                                label={label}
                                handleClick={() => setValue('genre', label as SearchModel['genre'])}
                            />
                        ))
                    }
                </div>
            </div>


            {/* card movie */}
            <div className='w-full flex flex-col justify-start items-start gap-3'>
                {/* title */}
                <h2 className='text-white font-semibold capitalize text-lg'>
                    all new movies
                </h2>

                {/* content card */}
                <div className='w-full flex flex-col justify-start items-start gap-5'>
                    <CardMovie />
                    <CardMovie />
                    <CardMovie />
                </div>
            </div>
        </div>
    )
}


// header 
const HeaderComponent: FC = () => {
    return (
        <div className='w-full flex flex-row justify-between items-center'>
            {/* profile */}
            <div className='flex-3/4 flex flex-row justify-start items-center gap-4'>
                {/* img */}
                <div className='w-15 h-15 rounded-full bg-white'>
                    <img src={dumy} alt="profile" className='w-full h-full object-cover' />
                </div>

                {/* label */}
                <div className='h-full flex flex-col justify-start items-start'>
                    {/* rank */}
                    <p className='text-white font-light text-base capitalize'>
                        premium,
                    </p>

                    {/* name */}
                    <h3 className='text-white font-semibold capitalize text-base'>
                        ilham rohmatulloh
                    </h3>
                </div>
            </div>

            {/* notification */}
            <div className='flex-1 flex flex-row justify-end items-center'>
                <button type='submit' className='h-full'>
                    <img src={iconNotification} alt="icon notification" className='w-full h-full' />
                </button>
            </div>
        </div>
    )
}


// genre 
type PropsGenre = {
    label: string;
    handleClick: () => void;
    active: boolean
}
const GenreComponent: FC<PropsGenre> = ({ label, handleClick, active }) => {
    return (
        <button type='button' className={clsx(
            '  capitalize text-base font-semibold py-2.5 px-4 rounded-full transition-all duration-300 ease-in-out snap-start',
            active ? 'bg-white text-black' : 'bg-white/10 text-white'
        )} onClick={handleClick}>
            {label}
        </button>
    )
}

export default HomePage

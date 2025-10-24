import { type FC } from 'react'
import iconNoteFavorite from '../../assets/images/icons/note-favorite.svg'
import { Link } from 'react-router-dom'

type Props = {
    thumbnail: string;
    title: string;
    subtitle: string;
    buttonFirst: string;
    buttonSecond: string
    linkButtonFirst: string;
    linkButtonSecond: string
}
const SuccessPageLayout: FC<Props> = ({ thumbnail, title, subtitle, buttonFirst, buttonSecond, linkButtonFirst, linkButtonSecond }) => {
    return (
        <div className='w-full flex flex-col justify-start items-center min-h-[100vh] bg-black'>
            {/* thumbnail */}
            <img src={thumbnail} alt="thumbnail" className='w-full h-[55vh] object-cover fixed' />

            {/* shadow */}
            <div className='w-full h-[55vh] z-20 flex flex-col justify-end items-center relative'>
                <div className='w-full bg-gradient-to-b from-black to-transparent z-10 h-[30%] fixed top-0' />
                <div className='w-full bg-gradient-to-t from-black to-transparent z-10 h-[40%] absolute bottom-0' />
            </div>

            {/* content */}
            <div className='w-full min-h-[45vh] flex flex-col justify-start items-center bg-black -mt-1 z-20 gap-5'>

                {/* icon */}
                <img src={iconNoteFavorite} alt="icon note favorite" className='w-14 h-14 mt-4' />

                {/* big title */}
                <h2 className='text-white font-extrabold text-3xl'>{title}</h2>


                {/* subtitle */}
                <p className='text-white text-center text-base font-semibold w-[23rem]'>{subtitle}</p>

                {/* button */}
                <div className='w-full flex flex-col justify-start items-center gap-3'>
                    {/* button first  */}
                    <Link to={linkButtonFirst} className='w-[55%] text-center py-3 rounded-full bg-white text-black font-bold text-base capitalize'>
                        {buttonFirst}
                    </Link>

                    {/* button second */}
                    <Link to={linkButtonSecond} className='w-[55%] text-center py-3 rounded-full bg-white/10 backdrop-blur-sm text-white font-bold text-base capitalize'>
                        {buttonSecond}
                    </Link>
                </div>
            </div>

        </div>
    )
}

export default SuccessPageLayout

import { type FC } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'
import iconSearch from '../../assets/images/icons/search-white-bg.svg'
type Props = {
    register: UseFormRegisterReturn;
}
const SearchBox: FC<Props> = ({ register }) => {
    return (
        <div className='w-full rounded-full flex flex-row justify-start items-center gap-2 bg-white/10'>
            {/* input */}
            <div className='w-full pl-5 py-4'>
                <input
                    {...register}
                    type="text"
                    placeholder='Search movie'
                    className='placeholder:text-white w-full bg-transparent outline-none text-white font-semibold text-base'
                />
            </div>

            {/* icon seach */}
            <div className='h-full'>
                <img src={iconSearch} alt="icon search" />
            </div>
        </div>
    )
}

export default SearchBox

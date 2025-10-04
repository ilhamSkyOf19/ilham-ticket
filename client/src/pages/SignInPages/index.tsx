import { type FC } from 'react'

import thumbnail from '../../assets/thumb/thumbnail.jpg'

const SignInPages: FC = () => {
    return (
        <div className='flex flex-col justify-start items-center h-[100vh] w-full overflow-hidden relative bg-carbon'>
            {/* content 1 */}
            <div className='flex-1/2 w-full overflow-hidden'>
                <img src={thumbnail} alt="thumbnail" className='w-full h-full object-cover' loading='lazy' />
            </div>

            <div className='flex-1' />

            {/* shadow */}
            <div className='absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B] to-transparent z-10 top-[30%]' />

            {/* content 2 */}
            <div className='absolute inset-0 flex flex-col justify-end items-start w-full bg-transparent z-20'>
                {/* title */}
                <div className='w-full h-1/2 flex justify-start items-start px-6'>
                    <h1 className='text-3xl font-bold text-white capitalize'>sign in</h1>
                </div>
            </div>
        </div>
    )
}

export default SignInPages

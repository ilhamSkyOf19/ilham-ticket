import { type FC, type ReactNode } from 'react'

import thumbnail from '../../assets/thumb/thumbnail.jpg'
import { Link } from 'react-router-dom';



// Props
type Props = {
    type: 'signin' | 'signup';
    children: ReactNode;
}

const SignLayout: FC<Props> = ({ type, children }) => {
    return (
        <div className='flex flex-col justify-start items-center h-[100vh] w-full overflow-hidden relative bg-carbon'>
            {/* content 1 */}
            <div className='h-[60%] w-full overflow-hidden'>
                <img src={type === 'signin' ? thumbnail : thumbnail} alt="thumbnail" className='w-full h-full object-cover' loading='lazy' />
            </div>

            <div className='flex-1' />

            {/* shadow */}
            <div className='absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B] to-transparent z-10 top-[15%]' />

            {/* container form */}
            <div className='absolute inset-0 flex flex-col justify-end items-start w-full bg-transparent z-20 overflow-auto'>
                {/* content */}
                <div className='w-full h-full flex flex-col justify-end items-start px-6'>
                    {/* title */}
                    <h1 className='w-full text-3xl font-bold text-white capitalize'>{
                        type === 'signin' ? 'Sign In' : 'Sign Up'}
                    </h1>

                    {/* form */}
                    <div className='w-full flex flex-col justify-start items-start mt-6 gap-0.5 pb-12'>
                        {/* input email */}
                        {children}

                        {/* sign */}
                        <Link to={type === 'signin' ? '/signup' : '/signin'} className='w-full rounded-full bg-[#FFFFFF33] text-center mt-2 py-3.5 font-bold text-white'>
                            {type === 'signin' ? 'Create New Account' : 'Sign In'}
                        </Link>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default SignLayout

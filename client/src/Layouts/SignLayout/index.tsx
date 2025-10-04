import { type FC, type ReactNode } from 'react'

import thumbnail from '../../assets/thumb/thumbnail.jpg'



// Props
type Props = {
    type: 'signin' | 'signup';
    children: ReactNode;
}

const SignLayout: FC<Props> = ({ type, children }) => {
    return (
        <div className='flex flex-col justify-start items-center h-[100vh] w-full overflow-hidden relative bg-carbon'>
            {/* content 1 */}
            <div className='flex-1/2 w-full overflow-hidden'>
                <img src={type === 'signin' ? thumbnail : thumbnail} alt="thumbnail" className='w-full h-full object-cover' loading='lazy' />
            </div>

            <div className='flex-1' />

            {/* shadow */}
            <div className='absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B] to-transparent z-10 top-[30%]' />

            {/* children */}
            {children}
        </div>
    )
}

export default SignLayout

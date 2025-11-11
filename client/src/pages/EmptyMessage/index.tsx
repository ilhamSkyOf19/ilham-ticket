import { type FC } from 'react'

type Props = {
    message: string;
}

const EmptyMessage: FC<Props> = ({ message }) => {
    return (
        <div className='w-full flex flex-row justify-center items-center'>
            <h2 className='text-white font-bold text-base text-center'>{message}</h2>
        </div>
    )
}

export default EmptyMessage

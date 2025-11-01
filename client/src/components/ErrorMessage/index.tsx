import clsx from 'clsx';
import { type FC } from 'react'

// Props 
type Props = {
    message?: string;
}

const ErrorMessage: FC<Props> = ({ message }) => {
    return (
        <div className='w-full h-4 '>
            <p className={clsx(
                'text-red-500 text-to-small font-medium transition-all duration-300 ease-in-out capitalize italic',
                message ? 'visible' : 'invisible'
            )}>
                {message}
            </p>
        </div>
    )
}

export default ErrorMessage

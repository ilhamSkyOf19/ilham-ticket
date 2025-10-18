import clsx from 'clsx'
import { type FC } from 'react'

// props 
type Props = {
    status: 'success' | 'failed'
}
const Status: FC<Props> = ({ status }) => {
    return (
        <h2 className={clsx(
            'uppercase text-to-small py-1.5 px-2 rounded-full font-normal',
            status === 'success' ? 'text-green-700 bg-green-200' : 'text-red-500 bg-red-200'
        )}>
            {status}
        </h2>

    )
}

export default Status

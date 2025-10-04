import { type FC } from 'react'
import clsx from 'clsx'

// Props 
type Props = {
    text: string;
    htmlFor: string;
    className?: string;
}

const Label: FC<Props> = ({ text, htmlFor, className }) => {
    return (
        <label htmlFor={htmlFor} className={
            clsx('text-base text-white font-medium capitalize',
                className)}>
            {text}
        </label>
    )
}

export default Label

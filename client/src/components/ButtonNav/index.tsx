import clsx from 'clsx'
import { type FC } from 'react'
import { Link } from 'react-router-dom'
// Props 
type Props = {
    active: boolean,
    path: string
    handleActive: (path: string) => void
    icon: string
    name: string
}

const ButtonNav: FC<Props> = ({ active, path, handleActive, icon, name }) => {
    return (
        <Link to={path} className={clsx(
            'w-12 h-12 rounded-full  backdrop-blur-sm flex flex-row justify-center items-center transition-all duration-300 ease-in-out',
            active ? 'bg-white px-3.5 w-32 gap-2' : 'bg-white/10'
        )} onClick={() => { handleActive(path) }} >
            <img src={icon} alt="icon" className={clsx(
                'w-6 h-6',
                active ? 'invert' : 'grayscale'
            )} />

            {/* label */}
            <p className={clsx(
                'text-black font-bold text-sm capitalize transition-all duration-300',
                active ? 'w-16' : 'w-0 opacity-0'
            )}>
                {name}
            </p>
        </Link>
    )
}

export default ButtonNav

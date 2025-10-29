import clsx from 'clsx';
import { type FC, type RefObject } from 'react'


type Props = {
    ref: RefObject<HTMLDivElement>;
    sidebarOpen: boolean;
}
const SideBar: FC<Props> = ({ ref, sidebarOpen }) => {
    return (
        <div ref={ref} className={clsx(
            'w-[20rem] h-[100vh] fixed flex flex-col justify-start bg-white/10 backdrop-blur-xl pt-16 px-4 transition-transform duration-300 ease-in-out',
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}>

        </div>
    )
}

export default SideBar

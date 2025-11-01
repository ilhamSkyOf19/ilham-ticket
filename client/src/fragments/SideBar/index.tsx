import clsx from 'clsx';
import { type FC, type RefObject } from 'react'
import { IoIosClose } from 'react-icons/io';


type Props = {
    ref: RefObject<HTMLDivElement>;
    sidebarOpen: boolean;
    handleSidebarToggle: () => void;
}
const SideBar: FC<Props> = ({ ref, sidebarOpen, handleSidebarToggle }) => {
    return (
        <div ref={ref} className={clsx(
            'w-[60%] h-[100vh] fixed flex flex-col justify-start bg-white/10 backdrop-blur-xl pt-3 px-4 transition-transform duration-300 ease-in-out z-30',
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}>
            <div className='w-full flex flex-row justify-between items-center'>
                {/* title */}
                <h2 className='text-white font-bold text-xl'>
                    Ilham Ticket
                </h2>

                {/* button close */}
                <button type="button" className='h-full flex flex-row justify-center items-center group' onClick={handleSidebarToggle}>
                    <IoIosClose className={clsx(
                        'text-white text-4xl transition-transform duration-1000 ease-in-out group-hover:scale-120',
                        sidebarOpen ? 'rotate-0' : '-rotate-180'
                    )} />
                </button>
            </div>
        </div>
    )
}

export default SideBar

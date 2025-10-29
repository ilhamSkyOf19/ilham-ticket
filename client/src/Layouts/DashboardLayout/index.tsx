import { useEffect, useRef, useState, type FC, type RefObject } from 'react'
import { Outlet } from 'react-router-dom'
import { PiSidebarSimple } from "react-icons/pi";
import SideBar from '../../fragments/SideBar';


const DashboardLayout: FC = () => {

    // state sidebar open
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

    // ref sidebar 
    const useRefSidebar = useRef<HTMLDivElement>(null);

    // handle sidebar toggle
    const handleSidebarToggle = () => {
        setSidebarOpen(!sidebarOpen);
    }



    // handle close sidebar on click outside
    useEffect(() => {
        const handleClickOutside = (even: MouseEvent) => {
            // initialize sidebar ref
            const sidebarRefCurrent = useRefSidebar.current;

            // cek 
            if (sidebarRefCurrent && !sidebarRefCurrent.contains(even.target as Node)) {
                setSidebarOpen(false);
            }
        }


        // add event listener
        document.addEventListener('mousedown', handleClickOutside);

        // clean up
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [useRefSidebar]);



    return (
        <div className='w-full flex flex-row justify-start items-start gap-2 relative'>
            {/* header top for mobile */}
            <div className='fixed top-0 left-0 w-full h-16 bg-white/10 backdrop-blur-sm flex justify-between items-center md:hidden px-4    '>
                {/* bars */}
                <button type='button' onClick={handleSidebarToggle} className='group'>
                    <PiSidebarSimple className='text-white text-3xl group-hover:scale-110 transition-transform duration-300 ease-in-out' />
                </button>

                {/* title */}
                <h2 className='text-white font-bold text-2xl'>
                    Dashboard
                </h2>
            </div>


            {/* side bar */}
            <SideBar ref={useRefSidebar as RefObject<HTMLDivElement>} sidebarOpen={sidebarOpen} />


            {/* children */}
            <div className='flex-1 min-h-[100vh] bg-black pt-16 '>
                <Outlet />
            </div>
        </div>
    )
}

export default DashboardLayout

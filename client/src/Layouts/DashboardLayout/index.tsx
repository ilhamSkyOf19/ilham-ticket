import { useEffect, useRef, useState, type FC, type RefObject } from 'react'
import { Outlet, useMatch, useNavigate } from 'react-router-dom'
import { PiSidebarSimple } from "react-icons/pi";
import SideBar from '../../fragments/SideBar';
import { IoMdArrowRoundBack } from "react-icons/io";


const DashboardLayout: FC = () => {

    // navigate 
    const navigate = useNavigate();

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




    // cek pathname detail 
    const pathDetail = useMatch('/dashboard/dashboard-movie-detail/:id');







    return (
        <div className='w-full flex flex-row justify-start items-start gap-2 relative'>
            {/* header top for mobile */}
            <div className='fixed top-0 left-0 w-full h-13 bg-white/10 backdrop-blur-sm flex justify-between items-center md:hidden px-2 z-20'>

                {/* bars & back*/}
                {
                    pathDetail ? (
                        <button type='button' onClick={() => navigate('/dashboard')} className='flex flex-row justify-center items-center group'>
                            <IoMdArrowRoundBack className='text-white text-3xl group-hover:scale-110 transition-transform duration-300 ease-in-out:' />
                        </button>
                    ) : (
                        <button type='button' onClick={handleSidebarToggle} className='group'>
                            <PiSidebarSimple className='text-white text-3xl group-hover:scale-110 transition-transform duration-300 ease-in-out' />
                        </button>
                    )
                }

                {/* title */}
                <h2 className='text-white font-bold text-xl'>
                    {pathDetail ? 'Movie Detail' : 'Dashboard'}
                </h2>
            </div>


            {/* side bar */}

            <SideBar ref={useRefSidebar as RefObject<HTMLDivElement>} sidebarOpen={sidebarOpen} handleSidebarToggle={handleSidebarToggle} />


            {/* children */}
            <div className='flex-1 w-full min-h-[100vh] bg-black'>
                <Outlet />
            </div>
        </div>
    )
}

export default DashboardLayout

import { type FC } from 'react'
import { Outlet } from 'react-router-dom'
import BottomNavbar from '../../fragments/BottomNavbar';



const ClientLayout: FC = () => {




    return (
        <div className="bg-blue-dark w-full min-h-[100vh] relative flex flex-col justify-center items-center">

            {/* ellips blur */}
            <div className='absolute bg-white rounded-full w-[4rem] h-[4rem] top-[30%] left-[10%]' />

            {/* ellips blur */}
            <div className='absolute bg-white rounded-full w-[4rem] h-[4rem] top-[80%] left-[70%]' />


            {/* children */}
            <div className='z-10 bg-transparent w-full min-h-[100vh] backdrop-blur-3xl'>
                <Outlet />

            </div>
            {/* bottom bar */}
            <BottomNavbar />
        </div>
    )
}

export default ClientLayout

import { useState, type FC } from 'react'



// icon
import type { LinkType } from '../../types/types';
import ButtonNav from '../../components/ButtonNav';

import videoPlay from '../../assets/images/icons/video-play.svg'
import ticket from '../../assets/images/icons/ticket-star.svg'
import card from '../../assets/images/icons/cards.svg'
import setting from '../../assets/images/icons/setting-2.svg'



const BottomNavbar: FC = () => {

    // active 
    const [active, setActive] = useState<string>('/');


    // link
    const LinkNav: LinkType[] = [
        {
            name: 'Discover',
            icon: videoPlay,
            path: '/'
        },
        {
            name: 'Tickets',
            icon: ticket,
            path: '/ticket'
        },
        {
            name: 'E-Wallet',
            icon: card,
            path: '/wallet'
        },
        {
            name: 'Settings',
            icon: setting,
            path: '/setting'
        }
    ]




    return (
        <div className='w-[90%] fixed bottom-0 flex flex-row justify-center items-center py-4 z-20 bg-transparent'>
            <div className='bg-white/20 backdrop-blur-sm w-[90%] py-2.5 rounded-full flex flex-row justify-between items-center px-4'>
                {/* icon */}
                {
                    LinkNav.map((item: LinkType, index) => (
                        <ButtonNav key={index} name={item.name} active={active === item.path} path={item.path} handleActive={() => { setActive(item.path) }} icon={item.icon} />
                    ))
                }
            </div>
        </div>
    )
}

export default BottomNavbar

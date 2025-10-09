import { type FC } from 'react'
import { Link } from 'react-router-dom'



// icon 
import userOCtagon from '../../assets/images/icons/user-octagon.svg'
import helpCenter from '../../assets/images/icons/24-support.svg';
import like from '../../assets/images/icons/like.svg';
import cards from '../../assets/images/icons/cards.svg';
import ButtonActionSetting from '../../components/ButtonActionSetting';


// type action 
type Action = {
    icon: string;
    label: string;
    labelLink: string;
    link: string;
}



const SettingPage: FC = () => {


    const action: Action[] = [
        { icon: userOCtagon, label: 'Edit My Profile', link: '/', labelLink: 'edit' },
        { icon: like, label: 'Special Rewards', link: '/', labelLink: 'details' },
        { icon: helpCenter, label: 'Help Center', link: '/', labelLink: 'view all' },
        { icon: cards, label: 'E-Wallet Settings', link: '/', labelLink: 'manage' },
    ]



    return (
        <div className='w-full h-full bg-transparent flex flex-col justify-start items-start pt-18 px-6 gap-6'>
            {/* header */}
            <h1 className='text-white font-bold text-3xl'>Settings</h1>


            <div className='w-full flex flex-col justify-start items-center gap-6'>
                {/* img profile */}
                <div className='w-32 h-32 rounded-full bg-gray-300 mt-6 overflow-hidden'>
                    <img src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZSUyMHBob3RvfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60" alt="profile" className='w-full h-full object-cover' />
                </div>

                <div className='w-full flex flex-col justify-start items-center gap-2'>
                    {/* name */}
                    <p className='text-white font-bold text-2xl'>Ilham Rohmatulloh</p>

                    {/* email */}
                    <p className='text-gray-400 font-medium text-base'>
                        Ilham@gmail.com
                    </p>
                </div>
            </div>

            {/* helper */}
            <div className='w-full flex flex-col justify-start items-start gap-6'>
                {/* edit profile */}
                {
                    action.map((item: Action, index: number) => (
                        <ButtonActionSetting
                            key={index}
                            icon={item.icon}
                            link={item.link}
                            label={item.label}
                            labelLink={item.labelLink}
                        />
                    ))
                }

            </div>


            {/* button logout */}
            <button type='button' className='bg-white/10 rounded-full w-full py-3.5 text-center text-base font-bold text-white capitalize'>
                logout my account
            </button>

        </div>
    )
}

export default SettingPage

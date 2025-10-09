import type { FC } from 'react';
import { Link } from 'react-router-dom'



// Props 
type Props = {
    icon: string;
    label: string;
    labelLink: string;
    link: string;
}

const ButtonActionSetting: FC<Props> = ({ icon, label, link, labelLink }) => {
    return (
        <div className='w-full flex flex-row justify-between items-center gap-2'>
            {/* icon & label */}
            <div className='flex-1 flex justify-start items-center gap-3'>

                {/* icon */}
                <div className='w-13 h-13 bg-white/10 rounded-full flex justify-center items-center '>
                    <img src={icon} alt="icon" className='w-6 h-6' />
                </div>

                {/* label */}
                <p className='text-white font-light text-base capitalize'>{label}</p>
            </div>


            {/* button action */}
            <Link to={link} className='text-base font-bold text-black py-1.5 px-4 bg-white rounded-full capitalize' >
                {labelLink}
            </Link>

        </div>

    )
}

export default ButtonActionSetting

import { type FC } from 'react'
import ComponentInfo from '../ComponentInfo'
import iconLocation from '../../assets/images/icons/location.svg'

const ChooseTheaters: FC = () => {
    return (
        <div className='w-full flex flex-col justify-start items-start gap-2'>
            {/* label */}
            <h3 className='text-white text-base font-medium'>
                Choose Theaters
            </h3>


            {/* card theater for choose */}
            <div className='w-full flex flex-row justify-start items-start flex-wrap gap-2'>
                <div className='w-[8rem] h-[6rem] bg-white/10 rounded-2xl flex flex-col justify-start items-start px-3 py-3 gap-3'>
                    {/* title theater */}
                    <h3 className='text-white text-xs font-medium'>
                        Best Cinema MBK
                    </h3>

                    {/* location */}
                    <ComponentInfo
                        icon={iconLocation}
                        label={'Bandung'}
                    />
                </div>
                <div className='w-[8rem] h-[6rem] bg-white/10 rounded-2xl flex flex-col justify-start items-start px-3 py-3 gap-3'>
                    {/* title theater */}
                    <h3 className='text-white text-xs font-medium'>
                        Best Cinema MBK
                    </h3>

                    {/* location */}
                    <ComponentInfo
                        icon={iconLocation}
                        label={'Bandung'}
                    />
                </div>
                <div className='w-[8rem] h-[6rem] bg-white/10 rounded-2xl flex flex-col justify-start items-start px-3 py-3 gap-3'>
                    {/* title theater */}
                    <h3 className='text-white text-xs font-medium'>
                        Best Cinema MBK
                    </h3>

                    {/* location */}
                    <ComponentInfo
                        icon={iconLocation}
                        label={'Bandung'}
                    />
                </div>
                <div className='w-[8rem] h-[6rem] bg-white/10 rounded-2xl flex flex-col justify-start items-start px-3 py-3 gap-3'>
                    {/* title theater */}
                    <h3 className='text-white text-xs font-medium'>
                        Best Cinema MBK
                    </h3>

                    {/* location */}
                    <ComponentInfo
                        icon={iconLocation}
                        label={'Bandung'}
                    />
                </div>
            </div>
        </div>
    )
}

export default ChooseTheaters

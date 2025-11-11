import { type FC } from 'react'

import CardBonus from '../../components/CardBonus'

const AdminListBonusPage: FC = () => {
    return (
        <div className='w-full flex flex-col justify-start items-start py-18 px-2'>
            {/* header */}
            <div className='w-full flex flex-row justify-center items-start'>
                <h2 className='text-white font-bold text-base'>List Bonus</h2>
            </div>

            {/* container bonus */}
            <div className='w-full flex flex-col justify-start items-start flex-wrap mt-8 px-4 gap-4'>

                {/* <CardBonus code='PS1' admin={true} /> */}


            </div>


        </div>
    )
}

export default AdminListBonusPage

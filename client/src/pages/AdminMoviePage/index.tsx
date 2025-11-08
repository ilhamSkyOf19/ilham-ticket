import { type FC } from 'react'
import CardMovie from '../../components/CardMovie'
import ButtonAddCircleGreen from '../../components/ButtonAddCircleGreen'

const AdminMoviePage: FC = () => {
    return (
        <div className='w-full min-h-[100vh] flex flex-col justify-start items-start bg-black px-2 gap-4 relative pt-16'>

            {/* header */}
            <h2 className='text-white font-bold text-lg'>Data Movie</h2>


            {/* button add */}
            <ButtonAddCircleGreen link={'/dashboard/dashboard-movie-add'} />

            {/* movie */}
            <div className='w-full flex flex-col justify-start items-start'>
                {/* card movie */}
                <div className='w-full flex flex-col justify-start items-start gap-3'>
                    {/* card movie */}
                    <CardMovie dashboard={true} disable={true} />
                </div>
            </div>
        </div>
    )
}

export default AdminMoviePage

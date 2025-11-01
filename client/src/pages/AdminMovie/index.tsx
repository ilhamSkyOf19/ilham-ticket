import { type FC } from 'react'
import CardMovie from '../../components/CardMovie'
import { IoMdAdd } from 'react-icons/io'

const AdminMovie: FC = () => {
    return (
        <div className='w-full min-h-[100vh] flex flex-col justify-start items-start bg-black px-2 gap-4 relative pt-16'>

            {/* header */}
            <h2 className='text-white font-bold text-lg'>Data Movie</h2>


            {/* button add */}
            <div className='w-13 h-13 bg-green-700 rounded-full fixed z-20 bottom-6 right-6 flex flex-col justify-center items-center'>
                <IoMdAdd className='text-white text-4xl' />
            </div>


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

export default AdminMovie

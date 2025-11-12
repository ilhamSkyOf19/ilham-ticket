import { type FC } from 'react'
import ButtonEditPen from '../ButtonEditPen';
import ButtonDeleteTrash from '../ButtonDeleteTrash';

type Props = {
    name: string;
    id: number;
    handleDelete: (id: number) => void
}
const CardGenre: FC<Props> = ({ name, id, handleDelete }) => {
    return (
        <div className='w-full flex flex-row justify-between items-center py-4 px-6 bg-white/10 backdrop-blur-sm rounded-2xl'>
            {/* name */}
            <div className='flex-1 h-full justify-start items-center '>
                <h2 className='text-white text-base font-semibold capitalize'>{name}</h2>
            </div>

            {/* action */}
            <div className='flex-1 h-full flex flex-row justify-end items-center gap-4'>
                {/* edit */}
                <ButtonEditPen link={'/dashboard/dashboard-genre-update'} />

                {/* delete */}
                <ButtonDeleteTrash handleDelete={() => handleDelete(id)} />
            </div>
        </div>
    )
}

export default CardGenre

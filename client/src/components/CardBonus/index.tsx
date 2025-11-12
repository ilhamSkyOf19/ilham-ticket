import { type FC } from 'react'




// thumbnail 
import popcorn from '../../assets/images/thumbnails/popcorn.png'
import coffe from '../../assets/images/icons/coffee.svg'
import { useMatch } from 'react-router-dom'
import ButtonDeleteTrash from '../ButtonDeleteTrash'
import type { BonusResponseType } from '../../models/bonus-model'
import clsx from 'clsx'
import ButtonEditPen from '../ButtonEditPen'



// Props
type Props = Omit<BonusResponseType, 'img'> & {
    handleDelete?: (id: number) => void
}





const CardBonus: FC<Props> = ({ id, name, size, url_img, handleDelete }) => {

    // check admin with path
    const adminListBonus = useMatch('/dashboard/bonus');


    return (
        <div className={clsx(
            'rounded-2xl flex flex-row justify-start items-center gap-3 overflow-hidden p-2 bg-white/10 shrink-0 snap-start relative',
            adminListBonus ? 'w-full h-32' : 'w-60 h-24'
        )}>

            {/* button delete */}
            {
                adminListBonus && (
                    <>
                        <ButtonDeleteTrash handleDelete={() => handleDelete && handleDelete(id)} />
                        <ButtonEditPen link={`/dashboard/dashboard-bonus-update/${id}`} />
                    </>
                )
            }

            {/* thumbnail */}
            <div className='flex-1  h-full rounded-2xl'>
                <div className='w-full h-full rounded-2xl overflow-hidden'>
                    <img src={url_img ?? popcorn} alt="thumbnail" className='w-full h-full object-cover' />
                </div>
            </div>

            {/* description */}
            <div className='flex-2 flex flex-col justify-center items-start h-full gap-1'>
                {/* name */}
                <h2 className='text-white capitalize font-semibold text-base'>
                    {name ?? 'bonus'}
                </h2>
                {/* category */}
                <div className='w-full flex flex-row justify-start items-center gap-2'>
                    {/* icon */}
                    <img src={coffe} alt="icon" className='w-5 h-5' />

                    {/* label */}
                    <p className='text-slate-400 text-sm capitalize'>
                        {size ?? 'bonus'}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default CardBonus

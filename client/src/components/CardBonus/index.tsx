import { useEffect, useState, type FC } from 'react'




// thumbnail 
import popcorn from '../../assets/images/thumbnails/popcorn.png'
import milk from '../../assets/images/thumbnails/milk.png'
import coffe from '../../assets/images/icons/coffee.svg'



// Props
type Props = {
    code: 'PS1' | 'PS2' | 'PS3' | 'M1'
}



// type data 
type Data = {
    name: string;
    thumbnail: string;
    category: 'snacks' | 'drink';
}


const CardBonus: FC<Props> = ({ code }) => {
    // state thumbnail 
    const [data, setData] = useState<Data | null>(null);


    // set thumbnail
    useEffect(() => {
        switch (code) {
            case 'PS1':
                setData({
                    name: 'popcorn S',
                    thumbnail: popcorn,
                    category: 'snacks'
                })
                break;
            case 'PS2':
                setData({
                    name: 'popcorn M',
                    thumbnail: popcorn,
                    category: 'snacks'
                })
                break;
            case 'PS3':
                setData({
                    name: 'popcorn L',
                    thumbnail: popcorn,
                    category: 'snacks'
                })
                break;
            case 'M1':
                setData({
                    name: 'fresh milk',
                    thumbnail: milk,
                    category: 'drink'
                })
                break;
            default:
                setData(null)
                break;
        }
    }, [code])


    return (
        <div className='w-[15rem] h-[6rem]  rounded-2xl flex flex-row justify-start items-center gap-3 overflow-hidden p-2 bg-white/10 shrink-0 snap-start'>
            {/* thumbnail */}
            <div className='flex-1  h-full rounded-2xl'>
                <div className='w-full h-full rounded-2xl overflow-hidden'>
                    <img src={data?.thumbnail ?? popcorn} alt="thumbnail" className='w-full h-full object-cover' />
                </div>
            </div>

            {/* description */}
            <div className='flex-2 flex flex-col justify-center items-start h-full gap-1'>
                {/* name */}
                <h2 className='text-white capitalize font-semibold text-base'>
                    {data?.name ?? 'popcorn'}
                </h2>
                {/* category */}
                <div className='w-full flex flex-row justify-start items-center gap-2'>
                    {/* icon */}
                    <img src={coffe} alt="icon" className='w-5 h-5' />

                    {/* label */}
                    <p className='text-slate-400 text-sm capitalize'>
                        {data?.category ?? 'snacks'}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default CardBonus

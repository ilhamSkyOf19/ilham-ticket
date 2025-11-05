import { useEffect, useState, type FC } from 'react'
import type { UseFormClearErrors, UseFormSetValue } from 'react-hook-form';
import type { MovieCreateType } from '../../models/movie-model';
import clsx from 'clsx';
import ErrorMessage from '../ErrorMessage';

type Props = {
    setValue: UseFormSetValue<MovieCreateType>;
    clearErrors?: UseFormClearErrors<MovieCreateType>;
    error?: string;
    bonus: { id: number, name: string, size: string }[];
}


const ChooseBonus: FC<Props> = ({ setValue, clearErrors, bonus, error }) => {


    // state choose 
    const [choose, setChoose] = useState<number[]>([]);


    // handle choose 
    const handleChoose = (id: number) => {
        // cek choose & filter 
        if (choose && !choose.includes(id)) {

            // set choose
            setChoose([...choose, id]);

            // clear errors
            clearErrors?.('bonus');
        } else {
            setChoose(choose.filter((item) => item !== id));


        }
    }



    // cek state for set value 
    useEffect(() => {

        // set value
        setValue('bonus', choose);
    }, [choose])

    return (
        <div className='w-full flex flex-col justify-start items-start gap-2'>

            {/* label */}
            <h3 className='text-white text-base font-medium'>
                Choose Bonus
            </h3>

            {/* container card bonus */}
            <div className='w-full flex flex-row justify-start items-start flex-wrap gap-2'>
                {/* card */}

                {
                    bonus && bonus.length > 0 ? (
                        bonus.map((item: { id: number, name: string, size: string }, index: number) => (
                            <button key={index} type='button' onClick={() => handleChoose(item.id)} className={clsx(
                                'w-auto h-14 flex flex-col justify-between items-start rounded-2xl bg-white/10 px-4 py-2 border-2 transition-all duration-200 ease-in-out hover:bg-white/20',
                                choose.includes(item.id) ? 'border-blue-500' : error ? 'border-red-500' : 'border-transparent'
                            )}>

                                {/* name */}
                                <p className='text-white text-xs font-light'>
                                    {(`Popcond Original`).concat(' - ')}
                                </p>

                                {/* size */}
                                <p className='text-white text-xs font-light'>
                                    {`Medium`}
                                </p>
                            </button>
                        ))
                    ) : (
                        null
                    )
                }
            </div>

            {/* error */}
            <ErrorMessage message={error} />

        </div>
    )
}

export default ChooseBonus

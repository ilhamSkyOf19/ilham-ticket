import clsx from 'clsx';
import { useEffect, useRef, useState, type FC, type RefCallback } from 'react'
import ErrorMessage from '../ErrorMessage';
import { IoIosArrowDown } from "react-icons/io";
import { type UseFormClearErrors, type UseFormSetValue } from 'react-hook-form';
import type { MovieCreateType } from '../../models/movie-model';


type Props = {
    name: string;
    label: string;
    placeholder: string;
    fieldChoose: { id: number, name: string }[];
    setValue: UseFormSetValue<MovieCreateType>;
    clearErrors?: UseFormClearErrors<MovieCreateType>;
    error?: string;
    ref: RefCallback<HTMLInputElement>;
}


const InputChoose: FC<Props> = ({ name, label, placeholder, fieldChoose, setValue, error, clearErrors, ref }) => {
    // state modal choose 
    const [modalChoose, SetModalChoose] = useState<boolean>(false);

    // state choose 
    const [choose, setChoose] = useState<string>('');

    // ref modal choose 
    const refModalChoose = useRef<HTMLDivElement>(null);

    // ref button modal choose
    const refButtonModalChoose = useRef<HTMLButtonElement>(null);

    // handle modal choose
    const handleModalChoose = () => {
        SetModalChoose(!modalChoose);
    }


    // handle modal 
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            const targetButton = event.target as HTMLButtonElement;

            if (refModalChoose.current && !refModalChoose.current.contains(target) && !refButtonModalChoose.current?.contains(targetButton)) {
                SetModalChoose(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        }
    }, [refModalChoose])



    // handle choose 
    const handleChoose = (choose: { id: number, name: string }) => {
        // set value
        setValue('genre', choose.id.toString());

        // clear error
        clearErrors?.('genre');

        // set choose
        setChoose(choose.name);

        // close modal
        SetModalChoose(false);
    }



    return (
        <div className='w-full flex flex-col justify-start items-start relative z-20'>

            {/* label */}
            <label htmlFor={name} className='text-base font-medium text-white mb-2'>{label}</label>


            {/* input */}
            <div className={clsx(
                "w-full flex flex-row justify-start items-center gap-4 bg-[#FFFFFF33] rounded-full px-5 py-3 backdrop-blur-sm transition-all duration-300 ease-in-out focus-within:ring-2 mb-2",
                error ? 'ring-2 ring-red-500' : 'ring-slate-200'
            )}>
                {/* button */}
                <button type='button' className='absolute bg-transparent w-full h-full border-none outline-none z-10' onClick={handleModalChoose} ref={refButtonModalChoose} />



                {/* input */}
                <input
                    ref={ref}
                    type="text"
                    name={name}
                    id={name}
                    value={choose || ''}
                    readOnly
                    className='w-full bg-transparent outline-none border-none text-base placeholder:text-gray-400 placeholder:font-normal text-white font-semibold capitalize'
                    placeholder={placeholder}
                />


                {/* icon arrow down */}
                <IoIosArrowDown className={clsx(
                    'text-white text-2xl',
                    modalChoose ? 'rotate-180' : ''
                )} />

                {/* modal choose */}
                <div ref={refModalChoose} className={clsx(
                    'w-full flex flex-col justify-start items-start bg-white absolute top-13 left-0 overflow-hidden transition-all duration-300 ease-in-out rounded-lg overflow-y-scroll',
                    modalChoose ? 'max-h-[12rem]' : 'max-h-0'
                )}>
                    {
                        fieldChoose.map((item: { id: number, name: string }, index) => (
                            <button key={index} type='button' onClick={() => handleChoose(item)} className='w-full py-3 hover:bg-gray-400 hover:text-white text-left px-5 text-black font-semibold'>
                                {item.name}
                            </button>
                        ))
                    }
                </div>
            </div>

            {/* error */}
            <ErrorMessage message={error} />
        </div>
    )
}

export default InputChoose

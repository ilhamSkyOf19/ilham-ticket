import { useEffect, useRef, useState, type ChangeEvent, type FC } from 'react'
import type { UseFormClearErrors, UseFormSetValue } from 'react-hook-form'
import type { TheaterCreateType, TheaterUpdateType } from '../../models/theater-model'
import ErrorMessage from '../ErrorMessage'
import { MdAddPhotoAlternate } from 'react-icons/md'
import clsx from 'clsx'
import type { BonusCreateType, BonusUpdateType } from '../../models/bonus-model'

// Props 
type Props = {
    setValuesTheater?: UseFormSetValue<TheaterCreateType | TheaterUpdateType>
    clearErrorsTheater?: UseFormClearErrors<TheaterCreateType | TheaterUpdateType>
    setValuesBonus?: UseFormSetValue<BonusCreateType | BonusUpdateType>
    clearErrorsBonus?: UseFormClearErrors<BonusCreateType | BonusUpdateType>
    error?: string;
    type: 'theater' | 'bonus'
    previewUpdate?: string
}

const InputImgSmall: FC<Props> = ({ setValuesTheater, clearErrorsTheater, setValuesBonus, clearErrorsBonus, error, type, previewUpdate }) => {

    // state preview
    const [preview, setPreview] = useState<string | undefined>(undefined);


    // set ref 
    const refInput = useRef<HTMLInputElement>(null);

    // hanlde change 
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        // get file for preview & setValue
        const file = e.target.files?.[0];

        // cek file 
        if (file) {
            // set preview
            setPreview(URL.createObjectURL(file));

            // cek theater
            if (type === 'theater') {
                // set value
                setValuesTheater?.('img', file);

                // clear error
                clearErrorsTheater?.('img');
            } else {
                // set value
                setValuesBonus?.('img', file);

                // clear error
                clearErrorsBonus?.('img');
            }
        }
    }

    // handle click for input file 
    const handleClick = () => {
        refInput.current?.click();
    }


    // preview update 
    useEffect(() => {
        if (previewUpdate) {
            setPreview(previewUpdate);
        }
    }, [previewUpdate])


    return (
        <div className='w-full flex flex-col justify-start items-start gap-2'>
            {/* label */}
            <h3 className='text-white text-base font-medium capitalize'>
                Image {type === 'theater' ? 'Theater' : 'Bonus'}
            </h3>


            {/* input file hidden */}
            <input
                ref={refInput}
                type="file"
                name=""
                id=""
                accept='image/*'
                onChange={handleChange}
                hidden={true}
            />


            {/* img container */}
            <button type='button' onClick={handleClick} className={clsx(
                'w-32 h-32 rounded-2xl bg-white/20 backdrop-blur-sm flex flex-row justify-center items-center overflow-hidden transition-all duration-200 ease-in-out',
                error ? 'border-2 border-red-500' : 'border-2 border-transparent'
            )}>
                {/* icon */}
                {
                    preview ? (
                        <img src={preview} alt="img" className='w-full h-full object-cover' />
                    ) : (
                        <MdAddPhotoAlternate className='w-10 h-10 text-white/40' />

                    )
                }

            </button>

            {/* errro message */}
            <ErrorMessage message={error} />
        </div>
    )
}

export default InputImgSmall

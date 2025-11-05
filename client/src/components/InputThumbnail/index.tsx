import { useRef, useState, type ChangeEvent, type FC } from 'react'
import type { UseFormClearErrors, UseFormSetValue } from 'react-hook-form';
import type { MovieCreateType } from '../../models/movie-model';
import ErrorMessage from '../ErrorMessage';
import { LuTrash } from "react-icons/lu";
import { MdAddPhotoAlternate } from "react-icons/md";
import clsx from 'clsx';


type Props = {
    setValue: UseFormSetValue<MovieCreateType>;
    clearErrors?: UseFormClearErrors<MovieCreateType>;
    error?: string;
}


const InputThumbnail: FC<Props> = ({ setValue, clearErrors, error }) => {

    // state highlight 
    const [preview, setPreview] = useState<string | undefined>(undefined);


    // ref input 
    const refInput = useRef<HTMLInputElement>(null);

    // handle change
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        // get file for preview
        const file = e.target.files?.[0];
        if (file) {
            // set preview
            setPreview(URL.createObjectURL(file));


            // set value 
            setValue('thumbnail', file);


            // clear error
            clearErrors?.('thumbnail');
        }
    }

    // handle click 
    const handleClick = () => {
        refInput.current?.click();
    }

    // handle trash
    const handleReset = () => {
        // set preview
        setPreview(undefined);

        // set value
        setValue('thumbnail', new File([], ''));
    }



    return (
        <div className='w-full flex flex-col justify-start items-start gap-2'>
            {/* label */}
            <h3 className='text-white text-base font-medium'>
                Thumbnail
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


            {/* highlight */}
            <div className={clsx(
                'w-full h-40 bg-white/10 flex flex-col justify-center items-center rounded-2xl relative overflow-hidden',
                error ? 'border-2 border-red-500' : 'border-2 border-transparent'
            )}>
                <button type='button' onClick={handleClick} className='w-full h-full flex flex-col justify-center items-center'>
                    {
                        preview ? (
                            <img src={preview} alt="thumbnail" className='w-full h-full object-cover rounded-2xl' loading='lazy' />
                        ) : (
                            <MdAddPhotoAlternate className='w-10 h-10 text-white/60' />
                        )
                    }
                </button>

                {/* button trash */}
                {
                    preview && (
                        <button type='button' onClick={handleReset} className='w-10 h-10 rounded-full bg-red-500 flex justify-center items-center absolute bottom-2 right-2 z-20'>
                            <LuTrash className=' w-5 h-5 text-white' />
                        </button>
                    )
                }
            </div>


            {/* error message */}
            <ErrorMessage message={error} />
        </div>
    )
}

export default InputThumbnail

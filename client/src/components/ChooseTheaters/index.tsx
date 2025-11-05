import { useEffect, useState, type FC } from 'react'
import CardChooseCinema from '../CardChooseCinema'
import type { UseFormClearErrors, UseFormSetValue } from 'react-hook-form';
import type { MovieCreateType } from '../../models/movie-model';
import ErrorMessage from '../ErrorMessage';


type Props = {
    setValue: UseFormSetValue<MovieCreateType>;
    clearErrors?: UseFormClearErrors<MovieCreateType>;
    error?: string;
}
const ChooseTheaters: FC<Props> = ({ setValue, clearErrors, error }) => {

    // data 
    const data: { id: number; title: string; location: string }[] = [
        {
            id: 1,
            title: 'Best Cinema MBK',
            location: 'Bandung'
        },
        {
            id: 2,
            title: 'Cinema XXI',
            location: 'Bandung'
        },
        {
            id: 3,
            title: 'HollyWood Cinema',
            location: 'Bandung'
        }
    ]

    // state theater choose
    const [selectedTheater, setSelectedTheater] = useState<number[]>([]);


    // handle click theater
    const handleClickTheater = (id: number) => {

        // cek if theater already selected
        if (selectedTheater.includes(id)) {
            // remove theater from selected
            setSelectedTheater(selectedTheater.filter(theaterId => theaterId !== id));


        } else {
            // add theater to selected
            setSelectedTheater([...selectedTheater, id]);

            // clear error
            clearErrors?.('theaters');
        }
    }


    // useEffect to set value of selected theater
    useEffect(() => {
        // set value
        setValue('theaters', selectedTheater);


    }, [selectedTheater])




    return (
        <div className='w-full flex flex-col justify-start items-start gap-2'>


            {/* label */}
            <h3 className='text-white text-base font-medium'>
                Choose Theaters
            </h3>


            {/* card theater for choose */}
            <div className='w-full flex flex-row justify-start items-start flex-wrap gap-2'>
                {
                    data.map((theater) => (
                        <CardChooseCinema key={theater.id} handleClickTheater={handleClickTheater} theater={theater} active={selectedTheater.includes(theater.id)} error={error} />
                    ))
                }
            </div>

            {/* error */}
            <ErrorMessage message={error} />

        </div>
    )
}

export default ChooseTheaters

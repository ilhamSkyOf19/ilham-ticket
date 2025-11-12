import { useEffect, useState, type FC } from 'react'
import CardChooseCinema from '../CardChooseCinema'
import type { UseFormClearErrors, UseFormSetValue } from 'react-hook-form';
import type { MovieCreateType, MovieUpdateType } from '../../models/movie-model';
import ErrorMessage from '../ErrorMessage';
import type { TheaterResponseType } from '../../models/theater-model';


type Props = {
    setValue: UseFormSetValue<MovieCreateType | MovieUpdateType>;
    clearErrors?: UseFormClearErrors<MovieCreateType | MovieUpdateType>;
    error?: string;
    data: TheaterResponseType[];
    defaultValue?: TheaterResponseType[]
}
const ChooseTheaters: FC<Props> = ({ setValue, clearErrors, error, data, defaultValue }) => {


    // state theater choose
    const [selectedTheater, setSelectedTheater] = useState<number[]>([]);


    // useEffect to set default value
    useEffect(() => {
        if (defaultValue) {
            setSelectedTheater(defaultValue.map(theater => theater.id));
        }
    }, [defaultValue])


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
            clearErrors?.('theaterId');
        }
    }


    // useEffect to set value of selected theater
    useEffect(() => {
        // set value
        setValue('theaterId', selectedTheater);


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
                    data.length > 0 ? (
                        data.map((theater) => (
                            <CardChooseCinema key={theater.id} handleClickTheater={handleClickTheater} theater={theater} active={selectedTheater.includes(theater.id)} error={error} />
                        ))
                    ) : (
                        <div className='w-full flex flex-row justify-center items-center'>
                            <p className='text-white text-sm font-light'>
                                tidak ada pilihan theater
                            </p>
                        </div>
                    )
                }
            </div>

            {/* error */}
            <ErrorMessage message={error} />

        </div>
    )
}

export default ChooseTheaters

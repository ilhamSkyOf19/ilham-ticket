import { useEffect, useState, type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderBack from '../../components/HeaderBack';
import theaterDumy from '../../assets/images/thumbnails/theater1.png';
import CardMovie from '../../components/CardMovie';
import ListTheater from '../../components/ListTheater';

const ChooseTheaterPage: FC = () => {


    // navigate 
    const navigate = useNavigate();

    // state active 
    const [active, setActive] = useState<number | null>(null);

    // state warning 
    const [warning, setWarning] = useState<boolean>(false);


    // handle active
    const handleActive = (id: number) => setActive(id);



    // handle continue 
    const handleContinue = () => {
        // cek active
        if (active) {

            // set warning
            setWarning(false);


            // redirect 
            navigate(`/choose-seats`);
        } else {
            // set warning 
            setWarning(true);
        }

    }


    useEffect(() => { console.log(active) }, [active])


    return (
        <div className='w-full min-h-[100vh] flex flex-col justify-start items-start relative bg-black pt-12 gap-6 pb-32'>
            <div className='w-full px-4'>
                {/* header */}
                <HeaderBack label='choose theater' />
            </div>

            {/* thumbnail movie */}
            <div className='w-full px-4 flex flex-row justify-center items-start'>
                <CardMovie />
            </div>


            {/* list theater */}
            <div className='w-full px-4'>
                <ListTheater theaters={[
                    {
                        id: 1,
                        thumbnail: theaterDumy,
                        name: 'Cinema 1',
                        location: 'Jln Soekarno Hatta, Jakarta Selatan, Cinema lantai 2'
                    },
                    {
                        id: 2,
                        thumbnail: theaterDumy,
                        name: 'Cinema 1',
                        location: 'Jln Soekarno Hatta, Jakarta Selatan, Cinema lantai 2'
                    }
                ]}
                    choose={true}
                    warning={warning}
                    active={active as number}
                    selected={handleActive}
                />
            </div>


            {/* button continue */}
            <div className='fixed w-full flex flex-col justify-center items-center pb-4 bottom-0'>
                <button type='button' className='w-[90%] bg-white rounded-full text-center capitalize py-3.5 font-bold text-black' onClick={handleContinue}>
                    continue
                </button>
            </div>
        </div>
    )
}

export default ChooseTheaterPage

import { useEffect, useState, type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderBack from '../../components/HeaderBack';
import theaterDumy from '../../assets/images/thumbnails/theater1.png';
import CardMovie from '../../components/CardMovie';
import ListTheater from '../../components/ListTheater';
import CardTime from '../../components/CardTime';
import type { TimeType } from '../../types/types';

const ChooseTimePage: FC = () => {


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


    const dataTime: TimeType[] = [
        {
            id: 1,
            status: 'available',
            time: '10:00',
            date: new Date()
        },
        {
            id: 2,
            status: 'full',
            time: '12:00',
            date: new Date()
        },
        {
            id: 3,
            status: 'available',
            time: '14:00',
            date: new Date()
        },
        {
            id: 4,
            status: 'available',
            time: '16:00',
            date: new Date()
        },
        {
            id: 5,
            status: 'available',
            time: '18:00',
            date: new Date()
        },
    ]


    useEffect(() => { console.log(active) }, [active])




    return (
        <div className='w-full min-h-[100vh] flex flex-col justify-start items-start relative bg-black pt-12 gap-6 pb-32'>
            <div className='w-full px-4'>
                {/* header */}
                <HeaderBack label='choose time' />
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
                    }
                ]}
                />
            </div>


            {/* choose time */}
            <div className='w-full flex flex-col justify-start items-start gap-5 px-4'>
                {/* title */}
                <div className='w-full flex flex-row justify-start items-center gap-4'>
                    {/* title */}
                    <h3 className='text-white text-base font-semibold'>
                        Choose Time
                    </h3>
                    {/* warning */}
                    <p className="text-red-500 text-xs font-light transition-all duration-300 ease-in-out">
                        {warning && !active ? 'Please choose theater' : ''}
                    </p>
                </div>

                {/* time */}
                <div className='w-full grid grid-cols-2 auto-cols-max gap-3 md:grid-cols-3'>
                    {/* card  time */}
                    {
                        dataTime.length > 0 && (
                            dataTime.map((item: TimeType, index: number) => (
                                <CardTime key={index} id={item.id} status={item.status} time={item.time} date={item.date} selected={handleActive} active={active} warning={warning} />
                            ))
                        )
                    }
                </div>


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

export default ChooseTimePage

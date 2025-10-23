import { useEffect, useState, type FC } from 'react'
import HeaderBack from '../../components/HeaderBack'
import bgScreen from '../../assets/images/backgrounds/screen-light.svg'
import Seat from '../../components/Seat'
import clsx from 'clsx'
import { useNavigate } from 'react-router-dom'
import { formatIDR } from '../../helpers/formated'

const ChooseSeats: FC = () => {

    // navigate 
    const navigate = useNavigate();

    // state choose 
    const [choose, setChoose] = useState<number[]>([]);

    // state booked 
    const booked: number[] = [1, 5, 9, 10, 12, 17, 29, 30]

    // state price 
    const [price, setPrice] = useState<number>(0);


    // state active 
    const [active, setActive] = useState<boolean>(false);

    // handle choose 
    const handleChoose = (id: number) => {
        if (choose.includes(id)) {
            setChoose(choose.filter(item => item !== id))
        } else {
            setChoose([...choose, id])
        }
    };


    // price 
    useEffect(() => {
        // set active 
        setActive(false)

        // set price 
        setPrice(choose.length * 50000)
    }, [choose])

    // handle continue
    const handleContinue = () => {
        if (choose.length > 0) {
            // set active 
            setActive(false)

            // navigate 
            navigate(`/payment`);
        } else {
            setActive(true)
        }
    }




    return (
        <div className='w-full min-h-[100vh] flex flex-col justify-start items-center bg-black pt-12 pb-38'>

            {/* header */}
            <div className='w-full h-[25vh] px-4 pb-14 flex flex-col justify-between items-center relative'>

                {/* background */}
                <img src={bgScreen} alt="background screen" className='absolute bottom-0 blur-md bg-transparent' />
                <HeaderBack label='Choose Seats' />
                {/* title */}
                <h2 className='text-white uppercase text-base font-semibold'>screen</h2>
            </div>

            {/* seats */}
            <div className='w-[70%] grid grid-cols-5 gap-6'>
                {
                    [...Array(30)].map((_, index) => (
                        <Seat key={index} label={
                            index < 5 ? `A${index + 1}` :
                                index < 10 ? `B${(index - 5) + 1}` :
                                    index < 15 ? `C${(index - 10) + 1}` :
                                        index < 20 ? `D${(index - 15) + 1}` :
                                            index < 25 ? `E${(index - 20) + 1}` :
                                                `F${(index - 25) + 1}`
                        }
                            active={choose.includes(index + 1)}
                            booked={booked.includes(index + 1)}
                            handleChoose={() => handleChoose(index + 1)}
                        />
                    ))
                }
            </div>


            {/* description */}
            <div className='w-[75%] flex flex-row justify-between items-center mt-6 px-3'>
                {/* available */}
                <ComponentDescription available={true} />
                {/* booked */}
                <ComponentDescription booked={true} />
                {/* selected */}
                <ComponentDescription selected={true} />
            </div>

            {/* warning empty seat */}
            <div className='w-full flex flex-row justify-center items-center mt-6'>
                <p className={clsx(
                    'text-red-500 text-semibold text-base transition-opacity duration-200 ease-in-out',
                    active ? 'opacity-100' : 'opacity-0'

                )}>
                    Please choose at least one seat
                </p>
            </div>


            {/* button total price & continue */}
            <div className='w-full flex flex-col justify-start items-center fixed bottom-6'>
                <div className='w-[80%] rounded-full bg-white/10 flex flex-row justify-between items-center pl-6 pr-3.5 py-3'>

                    {/* total price */}
                    <div className='flex-3 flex flex-row justify-start items-center flex-wrap gap-1'>
                        <h4 className={clsx(
                            'text-white font-bold',
                            price.toString().length >= 7 ? 'text-base' : 'text-lg'
                        )}>
                            {formatIDR(price)}
                        </h4>

                        <p className='text-white text-base font-semibold'>
                            /Person
                        </p>
                    </div>

                    {/* continue */}
                    <button type='button' className='flex-1 flex flex-col justify-end items-center  rounded-full bg-white py-3 px-3 font-bold' onClick={handleContinue}>
                        Continue
                    </button>
                </div>
            </div>

        </div >
    )
}

// component description

type ComponentDescriptionProps = {
    available?: boolean;
    booked?: boolean;
    selected?: boolean
}
const ComponentDescription: FC<ComponentDescriptionProps> = ({ available, booked, selected }) => {
    return (
        <div className='flex flex-row justify-start items-center gap-2'>
            <div className={clsx(
                'w-4 h-4 rounded-md',
                available ? 'bg-white' : booked ? 'bg-white/30' : selected ? 'bg-blue-600' : ''
            )} />

            {/* label */}
            <p className='text-white text-sm'>
                {
                    available ? 'Available' :
                        booked ? 'Booked' : 'Selected'
                }
            </p>
        </div>
    )
}



export default ChooseSeats

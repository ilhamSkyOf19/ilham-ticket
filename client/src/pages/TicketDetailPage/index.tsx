import { type FC } from 'react'
import { useNavigate } from 'react-router-dom';
import CardTicket from '../../components/CardTicket';





// thumbnail
import dumyThumb from '../../assets/images/thumbnails/th3.png'
import ButtonBack from '../../components/ButtonBack';
import Bonus from '../../components/Bonus';
import TicketsDetail from '../../components/TicketsDetail';


const TicketDetailPage: FC = () => {



    // navigate
    const navigate = useNavigate();



    return (
        <div className='w-full min-h-[100vh] bg-blue-dark flex flex-col justify-start items-center pt-14 gap-8 pb-32'>
            <div className='w-full flex flex-col justify-start items-center relative gap-8 px-4'>
                {/* header */}
                <div className='w-full h-12 relative flex flex-row justify-center items-center'>
                    {/* nav back */}
                    <ButtonBack handleBack={() => navigate(-1)} />

                    {/* title */}
                    <h2 className='text-white text-base capitalize font-semibold'>
                        Ticket Details
                    </h2>
                </div>

                {/* thumbnail */}
                <CardTicket
                    id={1}
                    thumbnail={dumyThumb}
                    name={'Star Wars 3'}
                    genre={'Animation'}
                    location={'Jakarta'}
                    date={new Date('2025-10-10T14:30:00')}
                    status={'success'}
                    detail={true}
                />


                {/* order details */}
                <TicketsDetail payment={false} />

            </div>

            {/* bonus */}
            <Bonus bonus={['PS2', 'M1', 'M2']} />


            {/* button rating */}
            <div className='w-[90%] bg-white rounded-full fixed bottom-8 py-3'>
                <p className='text-black text-center font-bold text-base'>Give Rating</p>
            </div>
        </div>
    )
}

export default TicketDetailPage

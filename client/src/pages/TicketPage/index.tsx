import { type FC } from 'react'
import HeaderPage from '../../components/HeaderPage'
import CardTicket from '../../components/CardTicket'

// dumy thumb
import dumyThumb from '../../assets/images/thumbnails/th3.png'
import dumyThumb2 from '../../assets/images/thumbnails/th2.png'
import dumyThumb3 from '../../assets/images/thumbnails/th4.png'

const TicketPage: FC = () => {
    return (
        <div className='w-full flex flex-col justify-start items-center px-6 pb-12 gap-4'>
            {/* header */}
            <HeaderPage label='My Tickets' />


            {/* tickets */}
            <div className='w-full flex flex-col justify-start items-start gap-4.5'>
                {/* card ticket */}
                <CardTicket
                    id={1}
                    thumbnail={dumyThumb}
                    name={'Star Wars 3'}
                    genre={'Animation'}
                    location={'Jakarta'}
                    date={new Date('2025-10-10T14:30:00')}
                    status={'success'}
                />
                <CardTicket
                    id={2}
                    thumbnail={dumyThumb2}
                    name={'Star Wars 3'}
                    genre={'Animation'}
                    location={'Jakarta'}
                    date={new Date('2025-10-10T14:30:00')}
                    status={'failed'}
                />
                <CardTicket
                    id={3}
                    thumbnail={dumyThumb3}
                    name={'Star Wars 3'}
                    genre={'Animation'}
                    location={'Jakarta'}
                    date={new Date('2025-10-10T14:30:00')}
                    status={'success'}
                />
                <CardTicket
                    id={3}
                    thumbnail={dumyThumb3}
                    name={'Star Wars 3'}
                    genre={'Animation'}
                    location={'Jakarta'}
                    date={new Date('2025-10-10T14:30:00')}
                    status={'success'}
                />
                <CardTicket
                    id={3}
                    thumbnail={dumyThumb3}
                    name={'Star Wars 3'}
                    genre={'Animation'}
                    location={'Jakarta'}
                    date={new Date('2025-10-10T14:30:00')}
                    status={'success'}
                />
                <CardTicket
                    id={3}
                    thumbnail={dumyThumb3}
                    name={'Star Wars 3'}
                    genre={'Animation'}
                    location={'Jakarta'}
                    date={new Date('2025-10-10T14:30:00')}
                    status={'success'}
                />
                <CardTicket
                    id={3}
                    thumbnail={dumyThumb3}
                    name={'Star Wars 3'}
                    genre={'Animation'}
                    location={'Jakarta'}
                    date={new Date('2025-10-10T14:30:00')}
                    status={'success'}
                />
                <CardTicket
                    id={3}
                    thumbnail={dumyThumb3}
                    name={'Star Wars 3'}
                    genre={'Animation'}
                    location={'Jakarta'}
                    date={new Date('2025-10-10T14:30:00')}
                    status={'success'}
                />
                <CardTicket
                    id={3}
                    thumbnail={dumyThumb3}
                    name={'Star Wars 3'}
                    genre={'Animation'}
                    location={'Jakarta'}
                    date={new Date('2025-10-10T14:30:00')}
                    status={'success'}
                />
            </div>
        </div>
    )
}

export default TicketPage

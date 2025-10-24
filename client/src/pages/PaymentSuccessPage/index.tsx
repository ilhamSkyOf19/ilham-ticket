import { type FC } from 'react'
import dumyThumb from '../../assets/images/thumbnails/th3.png'
import SuccessPageLayout from '../../Layouts/SuccessPageLayout'

const PaymentSuccessPage: FC = () => {
    return (
        <SuccessPageLayout
            thumbnail={dumyThumb}
            title='Booking Successful'
            subtitle='Tiket anda telah berhasil dibeli silahkan periksa pada menu my ticket'
            buttonFirst='Book More'
            buttonSecond='View My Tickets'
            linkButtonFirst='/'
            linkButtonSecond='/ticket'
        />
    )
}

export default PaymentSuccessPage

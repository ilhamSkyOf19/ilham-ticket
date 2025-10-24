import { type FC } from 'react'
import dumyThumb from '../../assets/images/backgrounds/signup.png'
import SuccessPageLayout from '../../Layouts/SuccessPageLayout'

const TopupSuccessPage: FC = () => {
    return (
        <SuccessPageLayout
            thumbnail={dumyThumb}
            title='Topup Successful'
            subtitle='Kami telat mengupdate saldo Ewallet anda silahkan periksa kembali'
            buttonFirst='View My Ewallet'
            buttonSecond='Topup Again'
            linkButtonFirst='/wallet'
            linkButtonSecond='/topup-wallet'
        />
    )
}

export default TopupSuccessPage

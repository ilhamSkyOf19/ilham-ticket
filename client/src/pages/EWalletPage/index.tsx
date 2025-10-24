import { type FC } from 'react'
import HeaderPage from '../../components/HeaderPage'
import CardHistoryTransaction from '../../components/CardHistoryTransaction'


// logo 

import th3 from '../../assets/images/thumbnails/th3.png'
import Saldo from '../../components/Saldo'
import ButtonTopup from '../../components/ButtonTopup'

const EWalletPage: FC = () => {
    return (
        <div className='w-full flex flex-col justify-start items-center px-6 gap-6 pb-12'>

            {/* header */}
            <HeaderPage label='my wallet'>
                {/* button top up */}
                <ButtonTopup />
            </HeaderPage>


            {/* saldo */}
            <Saldo
                saldo={19234432}
                name={'Ilham Rohmatulloh'}
                expired={'12/12/2023'}
                branch={'BNI'}
            />

            {/* history transaction */}
            <HistoryTransaction />
        </div>
    )
}









// component History Transaction
const HistoryTransaction: FC = () => {
    return (
        <div className='w-full flex flex-col justify-start items-start gap-3'>
            {/* header */}
            <h2 className='text-white font-medium text-base capitalize'>latest transaction</h2>

            {/* history */}
            <div className='w-full flex flex-col justify-start items-start gap-4'>
                {/* card */}

                {
                    [1, 2, 3, 4, 5].map((_, index: number) => (
                        <CardHistoryTransaction
                            key={index}
                            plus={true}
                            nominal={3442000}
                            name={'start wars 3'}
                            status={'success'}
                            date='10/10/2025'
                            thumbnail={th3}
                        />
                    ))
                }
                {
                    [1, 2, 3].map((_, index: number) => (
                        <CardHistoryTransaction
                            key={index}
                            plus={false}
                            nominal={3442000}
                            name={'start wars 3'}
                            status={'failed'}
                            date='10/10/2025'
                        />
                    ))
                }


            </div>
        </div>
    )
}



export default EWalletPage

import { type FC } from 'react'
import HeaderPage from '../../components/HeaderPage'
import ButtonWhiteBlack from '../../components/ButtonWhiteBlack'
import CardHistoryTransaction from '../../components/CardHistoryTransaction'
import { formatIDR } from '../../helpers/formated'




// logo 
import logo from '../../assets/images/logos/wallet.svg'
import lines from '../../assets/images/backgrounds/wallet-lines.svg'
import th3 from '../../assets/images/thumbnails/th3.png'

const EWalletPage: FC = () => {
    return (
        <div className='w-full flex flex-col justify-start items-center px-6 gap-6 pb-12'>

            {/* header */}
            <HeaderPage label='my wallet'>
                {/* button top up */}
                <ButtonWhiteBlack label='top up' />
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


// component saldo
type SaldoProps = {
    saldo: number;
    name: string;
    expired: string;
    branch: string;
}


const Saldo: FC<SaldoProps> = ({ saldo, name, expired, branch }) => {
    return (
        <div className='bg-white/10 w-[92%] h-[13rem] flex flex-col justify-between items-start rounded-4xl overflow-hidden '>
            <div className=' flex-2 w-full flex flex-col justify-start items-start relative pt-6 gap-5 overflow-hidden'>
                {/* bg line */}
                <img src={lines} alt="lines" className='w-full absolute top-0 left-0 ' />

                {/* logo */}
                <div className='w-full flex flex-col justify-start items-start z-10 px-6'>
                    <img src={logo} alt="logo" />
                </div>

                {/* price */}
                <div className='w-full flex flex-row justify-start items-start z-10 px-6 pb-5'>
                    <h2 className='text-white font-bold text-4xl'>{formatIDR(saldo)}</h2>
                </div>
            </div>

            {/* footer saldo */}
            <div className='flex-1 w-full bg-white/20 backdrop-blur-3xl flex flex-row justify-between items-start z-10 px-6'>
                {/* name */}
                <KetSaldo label='name' value={name.slice(0, 7).concat('...')} />

                {/* expired */}
                <KetSaldo label='expired at' value={expired} />

                {/* branch */}
                <KetSaldo label='branch' value={branch} />
            </div>

        </div>
    )
}

// ket saldo

type KetSaldoProps = {
    label: string;
    value: string;
}


const KetSaldo: FC<KetSaldoProps> = ({ label, value }) => {
    return (
        <div className='flex flex-col justify-start items-start gap-1 pt-3'>
            {/* label */}
            <p className='capitalize text-white text-xs'>
                {label}
            </p>

            {/* value */}
            <p className='capitalize font-bold text-white text-sm '>
                {value}
            </p>
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

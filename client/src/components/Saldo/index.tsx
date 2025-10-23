import type { FC } from "react";
import { formatIDR } from "../../helpers/formated";
import logo from '../../assets/images/logos/wallet.svg'
import lines from '../../assets/images/backgrounds/wallet-lines.svg'

// component saldo
type Props = {
    saldo: number;
    name: string;
    expired: string;
    branch: string;
}


const Saldo: FC<Props> = ({ saldo, name, expired, branch }) => {
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


export default Saldo
import { useState, type FC } from 'react'
import HeaderBack from '../../components/HeaderBack'
import CardMovie from '../../components/CardMovie'
import TicketsDetail from '../../components/TicketsDetail'
import ButtonPayment from '../../components/ButtonPayment'
import Saldo from '../../components/Saldo'
import { Link, useNavigate } from 'react-router-dom'
import clsx from 'clsx'

const TicketsPaymentPage: FC = () => {

    // saldo
    const saldo: number = 12000000
    const grandTotal: number = 1200000

    // navigate 
    const navigate = useNavigate();

    // state agreement
    const [agreement, setAgreement] = useState<boolean>(false)


    // state agrement not selected 
    const [agreementNotSelected, setAgreementNotSelected] = useState<boolean>(false)


    // state saldo
    const [saldoNotEnough, setSaldoNotEnough] = useState<boolean>(false)

    // handle agreement
    const handleAgreement = () => {
        if (agreementNotSelected) setAgreementNotSelected(false);

        // set agreement
        setAgreement(!agreement)

    }

    // handle continue
    const handleContinue = () => {
        if (agreement) {
            // set agreement not selected
            setAgreementNotSelected(false)

            // cek saldo
            if (saldo < grandTotal) {
                // set saldo not enough
                setSaldoNotEnough(true)
                return;
            }

            // set saldo not enough
            setSaldoNotEnough(false)



            // navigate
            navigate(`/payment-success`);
        } else {
            setAgreementNotSelected(true)
        }
    }



    return (
        <div className='w-full min-h-[100vh] flex flex-col justify-start items-start pt-12 gap-6 bg-black px-4 pb-36 relative'>
            {/* header back */}
            <HeaderBack label='Tickets Payment' />

            {/* thumbnail */}
            <CardMovie />

            {/* order detail */}
            <TicketsDetail payment={true} />

            {/* saldo e wallet  */}
            <div className='w-full flex flex-col justify-start items-start gap-4'>
                {/* title */}
                <h3 className='text-white text-base font-semibold'>
                    My Wallet
                </h3>

                {/* saldo */}
                <div className='w-full flex flex-row justify-center items-center'>
                    <Saldo
                        saldo={saldo}
                        name={'Ilham Rohmatulloh'}
                        expired={'12/12/2023'}
                        branch={'BNI'}
                    />
                </div>
            </div>


            {/* warning top up */}
            {
                saldoNotEnough && (
                    <div className='w-full flex flex-row justify-between items-center rounded-2xl bg-red-500 py-3 px-4'>
                        {/* label */}
                        <p className='text-white font-semibold text-base'>
                            Saldo Ewallet anda tidak <br /> mencukupi untuk saat ini
                        </p>

                        {/* button topup */}
                        <Link to={'/'} className='bg-white py-4 px-5 rounded-full text-base font-bold'>
                            Top Up
                        </Link>
                    </div>
                )
            }


            {/* button agreement */}
            <div className='w-full flex flex-row justify-start item-start gap-2 '>
                {/* checkbox */}
                <div className='flex-1'>
                    <button type='button' className={clsx(
                        'w-8.5 h-8.5 border-1  rounded-xl flex flex-col justify-center items-center',
                        agreementNotSelected ? 'border-2 border-red-500' : 'border-blue-500'
                    )}>
                        <div className={clsx(
                            'w-5 h-5 rounded-md justify-center items-center bg-blue-700 transition-all duration-300 ease-in-out',
                            agreement ? 'opacity-100' : 'opacity-0'

                        )} onClick={handleAgreement} />
                    </button>
                </div>

                {/* label */}
                <p className='flex-8 text-white text-base'>
                    Saya setuju dengan ketentuan yang tersedia dan proses lanjut beli.
                </p>
            </div>


            {/* grand total + pay now */}

            <ButtonPayment
                price={grandTotal}
                handleContinue={() => handleContinue()}
                labelPrice='Grand Total'
                labelButton='Pay Now'
                col={true}
            />
        </div>
    )
}

export default TicketsPaymentPage

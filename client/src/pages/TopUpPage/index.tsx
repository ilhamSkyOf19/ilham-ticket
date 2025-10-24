import { useState, type FC } from 'react'
import HeaderBack from '../../components/HeaderBack'
import Saldo from '../../components/Saldo'
import { formatIDR } from '../../helpers/formated'
import ButtonChooseAmount from '../../components/CardAmount'
import ButtonContinue from '../../components/ButtonContinue'
import clsx from 'clsx'
import { useNavigate } from 'react-router-dom'

const TopUpPage: FC = () => {


    // navigation
    const navigate = useNavigate();


    // state dumy total topup
    const [totalTopup, setTotalTopup] = useState<number[]>([]);


    // state warning 
    const [warning, setWarning] = useState<boolean>(false)


    // handle topup
    const handleTopup = (amount: number) => {
        if (totalTopup.includes(amount)) {



            // set total topup
            setTotalTopup(totalTopup.filter(item => item !== amount))
        } else {
            // set warning 
            setWarning(false);
            // set total topup
            setTotalTopup([...totalTopup, amount])
        }
    }


    // handle continue 
    const handleContinue = () => {
        if (totalTopup.length > 0) {
            // set warning
            setWarning(false)

            // navigation
            navigate(`/midtrans-payment`)
        } else {

            // set warning
            setWarning(true)
        }
    }


    return (
        <div className='w-full min-h-[100vh] bg-black flex flex-col justify-start items-center pt-12 pb-32 px-4 gap-8'>
            {/* header */}
            <HeaderBack label='Topup Wallet' />


            {/* saldo */}
            <Saldo
                saldo={19234432}
                name={'Ilham Rohmatulloh'}
                expired={'12/12/2023'}
                branch={'BNI'}
            />

            {/* total topup */}
            <h2 className={clsx(
                'text-4xl font-extrabold mt-4 transition-colors duration-200 ease-in-out',
                warning ? 'text-red-500' : 'text-white'
            )}>
                {
                    totalTopup.length > 0 ? (
                        formatIDR(totalTopup.reduce((acc, cur) => acc + cur, 0))
                    ) : (
                        '--------'
                    )
                }
            </h2>

            {/* chppse amount */}
            <div className='w-full flex flex-col justify-start items-start gap-5'>
                <div className='w-full flex flex-row justify-start items-center gap-4'>
                    {/* title */}
                    <h3 className='text-white text-base font-semibold'>
                        Choose Amount
                    </h3>

                    {/* warning */}
                    <p className={clsx(
                        'text-red-500 text-sm font-medium transition-opacity duration-200 ease-in-out',
                        warning ? 'opacity-100' : 'opacity-0'
                    )}>
                        Please choose amount
                    </p>
                </div>

                {/* card amount */}
                <div className='w-full grid grid-cols-3 gap-4'>
                    {/* card */}
                    {
                        [10000, 20000, 30000, 40000, 50000, 100000, 300000, 400000, 600000].map((item: number, index) => (
                            <ButtonChooseAmount
                                key={index}
                                currency={'Rp'}
                                value={item}
                                active={totalTopup.includes(item)}
                                handleChoose={handleTopup}
                            />
                        ))
                    }
                </div>

                {/* button top up */}
                <ButtonContinue label='top up' handleContinue={() => handleContinue()} />
            </div>
        </div>
    )
}

export default TopUpPage

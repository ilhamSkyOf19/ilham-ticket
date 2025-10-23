import { type FC } from 'react'


type Props = {
    handleContinue: () => void;
}
const ButtonContinue: FC<Props> = ({ handleContinue }) => {
    return (
        <div className='fixed w-full flex flex-col justify-center items-center pb-4 bottom-0'>
            <button type='button' className='w-[90%] bg-white rounded-full text-center capitalize py-3.5 font-bold text-black' onClick={handleContinue}>
                continue
            </button>
        </div>
    )
}

export default ButtonContinue

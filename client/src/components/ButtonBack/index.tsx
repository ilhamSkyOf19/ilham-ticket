import clsx from 'clsx';
import { type FC } from 'react'
import { IoIosArrowRoundBack } from 'react-icons/io';


type Props = {
    handleBack: () => void;
    absolute?: boolean;
}

const ButtonBack: FC<Props> = ({ handleBack, absolute }) => {
    return (
        <button type='button' className={clsx(
            ' w-12 h-12 flex flex-row justify-center items-center bg-white/30 rounded-full',
            absolute === undefined && 'absolute top-0 left-0'
        )} onClick={() => handleBack()}>
            <IoIosArrowRoundBack className='text-white text-3xl' />
        </button>
    )
}

export default ButtonBack

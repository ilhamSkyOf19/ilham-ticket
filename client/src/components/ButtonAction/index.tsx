import { type FC } from 'react'


type Props = {
    label: string;
    handleClick: () => void
    color: string
}
const ButtonAction: FC<Props> = ({ label, handleClick, color }) => {
    return (
        <button type="button" className={`px-2.5 py-1.5 ${color} text-white text-xs rounded-md font-medium`} onClick={handleClick}>
            {label}
        </button>
    )
}

export default ButtonAction

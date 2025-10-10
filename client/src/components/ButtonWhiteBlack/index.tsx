import type { FC } from "react"



// props 
type Props = {
  label: string;
  handleClick?: () => void
}


const ButtonWhiteBlack: FC<Props> = ({ label, handleClick }) => {
  return (
    <button type="button" className="bg-white font-bold text-black capitalize py-3 px-4 rounded-full" onClick={handleClick}>
      {label}
    </button>
  )
}

export default ButtonWhiteBlack

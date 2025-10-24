import type { FC } from "react"
import { Link } from "react-router-dom";




const ButtonTopup: FC = () => {
  return (
    <Link to="/topup-wallet" type="button" className="bg-white font-bold text-black capitalize py-3 px-4 rounded-full">
      Top Up
    </Link>
  )
}

export default ButtonTopup

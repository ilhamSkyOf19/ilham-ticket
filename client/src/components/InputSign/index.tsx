import { useState, type FC } from "react"
import Label from "../Label"
import Input from "../Input";
import type { UseFormRegisterReturn } from "react-hook-form";
import clsx from "clsx";
import ErrorMessage from "../ErrorMessage";
import { IoEyeSharp } from "react-icons/io5";
import { IoEyeOffSharp } from "react-icons/io5";


// Props 
type Props = {
    name: string;
    label: string;
    type: 'text' | 'email' | 'password';
    placeholder: string;
    value?: string;
    register: UseFormRegisterReturn;
    error?: string;
}

const InputSing: FC<Props> = ({ name, label, type, placeholder, value, register, error }) => {

    // state eye 
    const [eye, setEye] = useState<boolean>(false);

    // handle eye 
    const handleEye = () => {
        setEye(!eye);
    }


    return (
        <div className="w-full flex flex-col justify-start items-start gap-2">
            {/* label */}
            <Label text={label} htmlFor={name} />

            {/* box input */}
            <div className="w-full flex flex-col justify-start items-start gap-2">
                <div className={clsx(
                    "w-full flex flex-row justify-start items-center gap-4 bg-[#FFFFFF33] rounded-full px-6 py-4 backdrop-blur-sm focus-within:ring-2 transition-all duration-300 ease-in-out",
                    error ? 'ring-2 ring-red-500' : 'ring-slate-200'
                )}>

                    {/* input */}
                    <div className="w-full h-full">
                        <Input
                            type={type === 'password' ? (eye ? 'text' : 'password') : type}
                            value={value}
                            register={register}
                            placeholder={placeholder}
                            name={name}
                        />
                    </div>

                    {/* eye */}
                    {
                        type === 'password' && (
                            <div className="h-full flex flex-row justify-center items-center">
                                <button type="button" onClick={handleEye}>
                                    {eye ? <IoEyeOffSharp size={24} className=" text-white" /> : <IoEyeSharp size={24} className=" text-white" />}
                                </button>
                            </div>
                        )
                    }
                </div>

                {/* error message  */}
                <ErrorMessage message={error} />
            </div>


        </div>
    )
}

export default InputSing

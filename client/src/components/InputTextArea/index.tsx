import { type FC } from "react"
import Label from "../../components/Label"
import type { UseFormRegisterReturn } from "react-hook-form";
import clsx from "clsx";
import ErrorMessage from "../../components/ErrorMessage";


// Props 
type Props = {
    name: string;
    label: string;
    placeholder: string;
    register: UseFormRegisterReturn;
    error?: string;
}

const InputTextArea: FC<Props> = ({ name, label, placeholder, register, error }) => {



    return (
        <div className="w-full flex flex-col justify-start items-start gap-2">
            {/* label */}
            <Label text={label} htmlFor={name} />

            {/* box input */}
            <div className="w-full flex flex-col justify-start items-start gap-2">
                <div className={clsx(
                    "w-full flex flex-row justify-start items-center gap-4 bg-[#FFFFFF33] rounded-2xl px-5 py-3 backdrop-blur-sm focus-within:ring-2 transition-all duration-300 ease-in-out",
                    error ? 'ring-2 ring-red-500' : 'ring-slate-200'
                )}>

                    {/* input */}
                    <div className="w-full h-full">
                        <textarea
                            {...register}
                            name={name}
                            id=""
                            cols={30}
                            rows={10}
                            placeholder={placeholder}
                            className="text-white w-full bg-transparent outline-none border-none text-base placeholder:text-gray-400 placeholder:font-normal font-semibold"
                        />

                    </div>

                </div>

                {/* error message  */}
                <ErrorMessage message={error} />
            </div>


        </div>
    )
}

export default InputTextArea

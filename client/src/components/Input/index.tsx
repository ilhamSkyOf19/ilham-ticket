import { type FC } from 'react'
import { type UseFormRegisterReturn } from 'react-hook-form'


// Props 
type Props = {
    type?: 'text' | 'email' | 'password';
    placeholder?: string;
    value?: string;
    register: UseFormRegisterReturn;
    name: string;
}

const Input: FC<Props> = ({ type, placeholder, value, register, name }) => {
    return (
        <input
            {...register}
            id={name}
            name={name}
            type={type ?? 'text'}
            placeholder={placeholder ?? ''}
            defaultValue={value ?? undefined}
            className='w-full bg-transparent outline-none border-none text-base placeholder:text-gray-400 placeholder:font-normal text-white font-semibold'
        />
    )
}

export default Input

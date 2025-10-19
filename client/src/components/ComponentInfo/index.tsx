import type { FC } from "react";

// component info
type ComponentInfoProps = {
    icon: string;
    label: string;
}
const ComponentInfo: FC<ComponentInfoProps> = ({ icon, label }) => {
    return (
        <div className='flex flex-row justify-start items-center gap-2'>
            {/* icon */}
            <img src={icon} alt="icon" className='w-4 h-4' />

            {/* label */}
            <p className='text-slate-300 text-xs font-extralight tracking-wider'>{label}</p>

        </div>
    )
}

export default ComponentInfo
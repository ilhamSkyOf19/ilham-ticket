import clsx from "clsx";
import type { FC } from "react";
import type { Genre } from "../../types/types";

// component info
type ComponentInfoProps = {
    icon: string;
    label: Genre | string;
    background?: boolean;
}
const ComponentInfo: FC<ComponentInfoProps> = ({ icon, label, background }) => {
    return (
        <div className={clsx(
            'flex flex-row justify-start items-center gap-2',
            background && 'bg-white/10 rounded-full px-3 py-3'
        )}>
            {/* icon */}
            <img src={icon} alt="icon" className={clsx(
                background ? 'w-5 h-5' : 'w-4 h-4'
            )} />

            {/* label */}
            <p className={clsx(
                'text-slate-300 text-xsfont-extralight tracking-wider',
                background ? 'text-sm' : 'text-xs'
            )}>{label}</p>

        </div>
    )
}

export default ComponentInfo
import { type FC, type ReactNode } from 'react'


// Props
type Props = {
    label: string;
    children?: ReactNode;
}

const HeaderPage: FC<Props> = ({ label, children }) => {
    return (
        <div className='w-full flex flex-row justify-between items-center'>
            {/* label */}
            <h1 className='text-white font-bold text-3xl capitalize'>{label}</h1>

            {/* button action */}
            {children ?? null}
        </div>
    )
}

export default HeaderPage

import type { FC } from "react";
import CardTheater from "../CardTheater";
import { useMatch } from "react-router-dom";
import clsx from "clsx";
import ButtonAddCircle from "../ButtonAddCircle";
import type { TheaterResponseType } from "../../models/theater-model";

// Theater
type PropsTheater = {
    theaters: TheaterResponseType[];
    choose?: boolean;
    active?: number;
    selected?: (id: number) => void
    warning?: boolean;
};
const ListTheater: FC<PropsTheater> = ({ theaters, choose, active, selected, warning }) => {



    // check admin with path
    const admin = useMatch('/dashboard/dashboard-movie-detail/:id');

    return (
        <div className='w-full flex flex-col justify-start items-start gap-5'>
            <div className={clsx(
                'w-full flex flex-row  items-center gap-4',
                !admin ? 'justify-start' : 'justify-between'
            )}>
                {/* title */}
                <h3 className='text-white text-base font-semibold'>
                    Available in Theaters
                </h3>

                {
                    admin ? (
                        <ButtonAddCircle link={'/dashboard/theater-movie-add'} />
                    ) : (
                        <>
                            {/* warning */}
                            <p className="text-red-500 text-xs font-light transition-all duration-300 ease-in-out">
                                {warning && !active ? 'Please choose theater' : ''}
                            </p>
                        </>
                    )
                }

            </div>


            {/* theater */}
            <div className='w-full flex flex-col justify-start items-start gap-4.5'>
                {/* card theater */}
                {
                    theaters.length > 0 && (
                        theaters.map((item: TheaterResponseType, index: number) => (
                            <CardTheater key={index} id={item.id} name={item.name} city={item.city} url_img={item.url_img} choose={choose} active={active} selected={() => selected && selected(item.id)} warning={warning} />
                        )
                        ))
                }
            </div>
        </div>
    )
}

export default ListTheater;
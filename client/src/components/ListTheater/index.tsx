import type { FC } from "react";
import type { TheatersType } from "../../types/types";
import CardTheater from "../CardTheater";

// Theater
type PropsTheater = {
    theaters: TheatersType[];
    choose?: boolean;
    active?: number;
    selected?: (id: number) => void
};
const ListTheater: FC<PropsTheater> = ({ theaters, choose, active, selected }) => {
    return (
        <div className='w-full flex flex-col justify-start items-start gap-5'>
            {/* title */}
            <h3 className='text-white text-base font-semibold'>
                Available in Theaters
            </h3>


            {/* theater */}
            <div className='w-full flex flex-col justify-start items-start gap-4.5'>
                {/* card theater */}
                {
                    theaters.length > 0 && (
                        theaters.map((item: TheatersType, index: number) => (
                            <CardTheater key={index} id={item.id} thumbnail={item.thumbnail} name={item.name} location={item.location} choose={choose} active={active} selected={() => selected && selected(item.id)} />
                        )
                        ))
                }
            </div>
        </div>
    )
}

export default ListTheater;
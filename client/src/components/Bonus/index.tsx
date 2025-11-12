import { type FC } from "react";
import clsx from "clsx";
import CardBonus from "../CardBonus";
import { useMatch } from "react-router-dom";
import type { BonusResponseType } from "../../models/bonus-model";

type Props = {
  bonus: BonusResponseType[] | null;
};
const Bonus: FC<Props> = ({ bonus }) => {
  // check admin with path
  const admin = useMatch("/dashboard/dashboard-movie-detail/:id");

  return (
    <div className="w-full flex flex-col justify-start items-start gap-4">
      {/* header */}
      <div className="w-full flex flex-row justify-between items-center">
        {/* title */}
        <h2
          className={clsx("text-white font-semibold text-lg capitalize px-4")}
        >
          Bonus Ticket
        </h2>
      </div>

      {/* bonus */}
      <div
        className={clsx(
          "w-full flex flex-row items-center",
          bonus && bonus.length > 0 ? " justify-start " : "justify-center"
        )}
      >
        {bonus && bonus.length > 0 ? (
          <div className="w-full flex flex-row justify-start items-start overflow-x-auto gap-4 scrollbar-hide snap-x snap-mandatory">
            {/* card bonus */}

            {/* spacer */}
            {admin ? null : <div className="w-0 snap-start" />}

            {bonus.map((item: BonusResponseType, index: number) => (
              <CardBonus
                key={index}
                id={item.id}
                name={item.name}
                size={item.size}
                url_img={item.url_img}
              />
            ))}

            {/* spacer */}
            <div className="w-4 snap-start" />
          </div>
        ) : (
          <p className="text-slate-500 font-semibold">Tidak Ada Bonus</p>
        )}
      </div>
    </div>
  );
};

export default Bonus;

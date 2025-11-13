import { useEffect, useState, type FC } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import HeaderBack from "../../components/HeaderBack";
import CardMovie from "../../components/CardMovie";
import ListTheater from "../../components/ListTheater";
import CardTime from "../../components/CardTime";
import type { ResponseType, TimeType } from "../../types/types";
import ButtonContinue from "../../components/ButtonContinue";
import type { MovieResponseType } from "../../models/movie-model";
import type { TheaterResponseType } from "../../models/theater-model";

const ChooseTimePage: FC = () => {
  // loader movie
  const movie = useLoaderData() as ResponseType<MovieResponseType | null>;

  // navigate
  const navigate = useNavigate();

  // state active
  const [active, setActive] = useState<number | null>(null);

  // state warning
  const [warning, setWarning] = useState<boolean>(false);

  // handle active
  const handleActive = (id: number) => setActive(id);

  // handle continue
  const handleContinue = () => {
    // cek active
    if (active) {
      // set warning
      setWarning(false);
      // redirect
      navigate(`/choose-seats`);
    } else {
      // set warning
      setWarning(true);
    }
  };

  const dataTime: TimeType[] = [
    {
      id: 1,
      status: "available",
      time: "10:00",
      date: new Date(),
    },
    {
      id: 2,
      status: "full",
      time: "12:00",
      date: new Date(),
    },
    {
      id: 3,
      status: "available",
      time: "14:00",
      date: new Date(),
    },
    {
      id: 4,
      status: "available",
      time: "16:00",
      date: new Date(),
    },
    {
      id: 5,
      status: "available",
      time: "18:00",
      date: new Date(),
    },
  ];

  useEffect(() => {
    console.log(active);
  }, [active]);

  return (
    <div className="w-full min-h-screen flex flex-col justify-start items-start relative bg-black pt-12 gap-6 pb-32">
      <div className="w-full px-4">
        {/* header */}
        <HeaderBack label="choose time" />
      </div>

      {/* thumbnail movie */}
      <div className="w-full px-4 flex flex-row justify-center items-start">
        <CardMovie movie={movie.data as MovieResponseType} />
      </div>

      {/* list theater */}
      <div className="w-full px-4">
        <ListTheater theaters={movie.data?.theaters as TheaterResponseType[]} />
      </div>

      {/* choose time */}
      <div className="w-full flex flex-col justify-start items-start gap-5 px-4">
        {/* title */}
        <div className="w-full flex flex-row justify-start items-center gap-4">
          {/* title */}
          <h3 className="text-white text-base font-semibold">Choose Time</h3>
          {/* warning */}
          <p className="text-red-500 text-xs font-light transition-all duration-300 ease-in-out">
            {warning && !active ? "Please choose theater" : ""}
          </p>
        </div>

        {/* time */}
        <div className="w-full grid grid-cols-2 auto-cols-max gap-3 md:grid-cols-3">
          {/* card  time */}
          {dataTime.length > 0 &&
            dataTime.map((item: TimeType, index: number) => (
              <CardTime
                key={index}
                id={item.id}
                status={item.status}
                time={item.time}
                date={item.date}
                selected={handleActive}
                active={active}
                warning={warning}
              />
            ))}
        </div>
      </div>

      {/* button continue */}
      <ButtonContinue handleContinue={handleContinue} />
    </div>
  );
};

export default ChooseTimePage;

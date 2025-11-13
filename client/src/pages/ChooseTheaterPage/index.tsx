import { useEffect, useState, type FC } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import HeaderBack from "../../components/HeaderBack";
import CardMovie from "../../components/CardMovie";
import ListTheater from "../../components/ListTheater";
import ButtonContinue from "../../components/ButtonContinue";
import type { ResponseType } from "../../types/types";
import type { MovieResponseType } from "../../models/movie-model";
import type { TheaterResponseType } from "../../models/theater-model";

const ChooseTheaterPage: FC = () => {
  // loader movie
  const movie = useLoaderData() as ResponseType<MovieResponseType | null>;

  console.log(movie);

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
      navigate(`/choose-times/${movie.data?.id}`);
    } else {
      // set warning
      setWarning(true);
    }
  };

  useEffect(() => {
    console.log(active);
  }, [active]);

  return (
    <div className="w-full min-h-screen flex flex-col justify-start items-start relative bg-black pt-12 gap-6 pb-32">
      <div className="w-full px-4">
        {/* header */}
        <HeaderBack label="choose theater" />
      </div>

      {/* thumbnail movie */}
      <div className="w-full px-4 flex flex-row justify-center items-start">
        {movie.status === "success" && movie.data ? (
          <CardMovie movie={movie?.data as MovieResponseType} />
        ) : null}
      </div>

      {/* list theater */}
      <div className="w-full px-4">
        <ListTheater
          theaters={movie?.data?.theaters as TheaterResponseType[]}
          choose={true}
          warning={warning}
          active={active as number}
          selected={handleActive}
        />
      </div>

      {/* button continue */}
      <ButtonContinue handleContinue={handleContinue} />
    </div>
  );
};

export default ChooseTheaterPage;

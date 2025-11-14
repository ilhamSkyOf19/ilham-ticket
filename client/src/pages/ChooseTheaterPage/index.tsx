import { useState, type FC } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import HeaderBack from "../../components/HeaderBack";
import CardMovie from "../../components/CardMovie";
import ListTheater from "../../components/ListTheater";
import ButtonContinue from "../../components/ButtonContinue";
import type { ResponseType } from "../../types/types";
import type { MovieHighlightResponseType } from "../../models/movie-model";
import type {
  TheaterResponseType,
  TheaterWithMovieResponseType,
} from "../../models/theater-model";
import { useAppDispatch } from "../../helpers/redux/hook";
import { setTheaterId } from "../../store/transactionSlice";

const ChooseTheaterPage: FC = () => {
  // inisialisasi dispatch
  const dispatch = useAppDispatch();

  // loader movie
  const theaters =
    useLoaderData() as ResponseType<TheaterWithMovieResponseType | null>;

  // navigate
  const navigate = useNavigate();

  // state active
  const [active, setActive] = useState<number | null>(null);

  // state warning
  const [warning, setWarning] = useState<boolean>(false);

  // handle active
  const handleActive = (id: number) => setActive(id);

  // handle continue
  const handleContinue = (id: number | undefined) => {
    // cek active
    if (active) {
      // set warning
      setWarning(false);

      // set movie
      dispatch(setTheaterId(id as number));

      // redirect
      navigate(`/choose-times/${theaters.data?.movie.id}`);
    } else {
      // set warning
      setWarning(true);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-start items-start relative bg-black pt-12 gap-6 pb-32">
      <div className="w-full px-4">
        {/* header */}
        <HeaderBack label="choose theater" />
      </div>

      {/* thumbnail movie */}
      <div className="w-full px-4 flex flex-row justify-center items-start">
        {theaters.status === "success" && theaters.data ? (
          <CardMovie
            movie={theaters?.data.movie as MovieHighlightResponseType}
          />
        ) : null}
      </div>

      {/* list theater */}
      <div className="w-full px-4">
        <ListTheater
          theaters={theaters?.data?.theater as TheaterResponseType[]}
          choose={true}
          warning={warning}
          active={active as number}
          selected={handleActive}
        />
      </div>

      {/* button continue */}
      <ButtonContinue
        handleContinueWithId={handleContinue}
        label="continue"
        id={active as number}
      />
    </div>
  );
};

export default ChooseTheaterPage;

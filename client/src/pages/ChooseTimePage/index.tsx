import { useEffect, useState, type FC } from "react";
import { useNavigate } from "react-router-dom";
import HeaderBack from "../../components/HeaderBack";
import CardMovie from "../../components/CardMovie";
import ListTheater from "../../components/ListTheater";
import CardTime from "../../components/CardTime";
import ButtonContinue from "../../components/ButtonContinue";
import type { MovieHighlightResponseType } from "../../models/movie-model";
import type { TheaterResponseType } from "../../models/theater-model";
import { useQuery } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "../../helpers/redux/hook";
import { useReadMovieByMovieIdAndTheaterId } from "../../hooks/useMovie";
import { setTime } from "../../store/transactionSlice";

const ChooseTimePage: FC = () => {
  // get hook redux
  const dataHook = useAppSelector((state) => state.transaction);

  // get dispatch redux
  const dispatch = useAppDispatch();
  // movie
  const { data } = useQuery({
    queryKey: ["data", dataHook.movieId, dataHook.theaterId],
    queryFn: () =>
      useReadMovieByMovieIdAndTheaterId(
        dataHook.movieId ?? 0,
        dataHook.theaterId ?? 0
      ),
  });

  // cek data
  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  // navigate
  const navigate = useNavigate();

  // state active
  const [active, setActive] = useState<string | null>(null);

  // state warning
  const [warning, setWarning] = useState<boolean>(false);

  // handle active
  const handleActive = (id: string) => setActive(id);

  // handle continue
  const handleContinue = () => {
    // cek active
    if (active) {
      // set warning
      setWarning(false);

      // set time
      dispatch(setTime(active));

      // redirect
      navigate(`/choose-seats`);
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
        <HeaderBack label="choose time" />
      </div>

      {/* thumbnail movie */}
      <div className="w-full px-4 flex flex-row justify-center items-start">
        {data?.data ? (
          <CardMovie movie={data?.data?.movie as MovieHighlightResponseType} />
        ) : null}
      </div>

      {/* list theater */}
      <div className="w-full px-4">
        {data?.data ? (
          <ListTheater
            theaters={[data?.data?.theater as TheaterResponseType]}
          />
        ) : null}
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
          {data?.data &&
            data?.data.movie.times.length > 0 &&
            data?.data.movie.times.map((item: string, index: number) => (
              <CardTime
                key={index}
                status={"available"}
                time={item}
                date={new Date()}
                selected={handleActive}
                active={active}
                warning={warning}
              />
            ))}
        </div>
      </div>

      {/* button continue */}
      <ButtonContinue handleContinueWithId={handleContinue} label="continue" />
    </div>
  );
};

export default ChooseTimePage;

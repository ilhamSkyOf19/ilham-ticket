import { useEffect, useState, type FC } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import type { ResponseType } from "../../types/types";
import type { MovieResponseType } from "../../models/movie-model";
import HeaderBack from "../../components/HeaderBack";
import InputRating from "../../components/InputRating";
import InputTextArea from "../../components/InputTextArea";
import CardMovie from "../../components/CardMovie";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ReviewCreateType } from "../../models/review-model";
import { ReviewValidation } from "../../validations/review-validation";
import { useMutation } from "@tanstack/react-query";
import { ReviewService } from "../../services/review.service";
import ButtonSubmit from "../../components/ButtonSubmit";
import { AxiosError } from "axios";
import ModalErrorUp from "../../components/ModalErrorUp";

const ReviewMoviePage: FC = () => {
  // state message modal
  const [messageError, setMessageError] = useState<string>("");

  // state modal active
  const [modalActive, setModalActive] = useState<boolean>(false);
  // navigate
  const navigate = useNavigate();

  // loader data
  const movie = useLoaderData() as ResponseType<MovieResponseType | null>;

  //   cek movie
  useEffect(() => {
    if (movie) {
      console.log(movie);
    }
  }, [movie]);

  // use form
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    clearErrors,
  } = useForm<Omit<ReviewCreateType, "movieId">>({
    resolver: zodResolver(ReviewValidation.CREATE),
  });

  // mutation
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: Omit<ReviewCreateType, "movieId">) => {
      return await ReviewService.create({
        ...data,
        movieId: movie?.data?.id ?? 0,
      });
    },

    // error
    onError: (error) => {
      console.log(error);

      // cek error form axios
      if (error instanceof AxiosError) {
        console.log(error.response?.status);

        // cek unauthorized
        if (error.response?.status === 401) {
          // navigate
          navigate("/signin");
        } else {
          console.log(error.response?.data?.message);
        }
      }
    },

    // success
    onSuccess: (data) => {
      console.log(data);

      // navigate
      navigate(`/movie-detail/${movie?.data?.id}`);
    },
  });

  // onsubmit
  const onSubmit = async (data: Omit<ReviewCreateType, "movieId">) => {
    try {
      // cek apakah username sudah coment
      if (movie?.data?.reviews?.find((review) => review.username)) {
        setMessageError("You have already commented on this movie");
        setModalActive(true);
        return;
      }
      // get mutation async
      await mutateAsync(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-blue-dark flex flex-col justify-start items-center pt-14 gap-8 pb-32">
      <div className="w-full flex flex-col justify-start items-center relative gap-8 px-4">
        {/* header */}
        <HeaderBack label="Review Movie" />

        {/* card movie */}
        <CardMovie
          movie={{
            id: movie?.data?.id ?? 0,
            city: movie?.data?.theaters?.[0]?.city ?? "",
            genre: movie?.data?.genres?.name ?? "",
            rating: movie?.data?.rating ?? 0,
            thumbnail: movie?.data?.url_thumbnail ?? "",
            title: movie?.data?.title ?? "",
            url_thumbnail: movie?.data?.url_thumbnail ?? "",
          }}
        />
        {/* form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col justify-start items-start"
        >
          {/* rating */}
          <Controller
            control={control}
            name="rating"
            render={({ field, fieldState }) => (
              <InputRating
                onChange={field.onChange}
                clearErrors={clearErrors}
                error={fieldState.error?.message}
              />
            )}
          />

          {/* comment */}
          <InputTextArea
            label="Comment"
            placeholder="enter your comment"
            register={register("comment")}
            error={errors?.comment?.message}
            name="comment"
          />

          {/* submit */}
          <div className="w-full mt-4">
            <ButtonSubmit label="Submit" isPending={isPending} />
          </div>
        </form>
      </div>

      {/* modal up */}
      <ModalErrorUp
        message={messageError}
        active={modalActive}
        handleClose={() => setModalActive(false)}
      />
    </div>
  );
};

export default ReviewMoviePage;

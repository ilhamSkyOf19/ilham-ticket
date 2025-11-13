import { useState, type FC } from "react";
import { Controller, useForm } from "react-hook-form";
import type {
  MovieCreateType,
  MovieResponseType,
  MovieUpdateType,
} from "../../models/movie-model";
import { zodResolver } from "@hookform/resolvers/zod";
import { MovieValidation } from "../../validations/movie-validation";
import { useMutation } from "@tanstack/react-query";
import InputComponent from "../../fragments/InputComponent";
import InputChoose from "../../components/InputChoose";
import ChooseTheaters from "../../components/ChooseTheaters";
import InputThumbnail from "../../components/InputThumbnail";
import { MovieService } from "../../services/movie.service";
import { useLoaderData, useNavigate } from "react-router-dom";
import type { TheaterResponseType } from "../../models/theater-model";
import type { GenreResponseType } from "../../models/genre-model";
import type { ResponseType } from "../../types/types";
import ButtonSubmit from "../../components/ButtonSubmit";
import type { BonusResponseType } from "../../models/bonus-model";
import ChooseBonus from "../../components/ChooseBonus";
import HeaderDashboardData from "../../components/HeaderDashboardData";
import ModalErrorUp from "../../components/ModalErrorUp";
import { AxiosError } from "axios";
import InputTextArea from "../../components/InputTextArea";
import InputTime from "../../components/InputTime";

// type loader
type LoaderData = {
  theaters: ResponseType<TheaterResponseType[] | null>;
  genres: ResponseType<GenreResponseType[] | null>;
  bonus: ResponseType<BonusResponseType[] | null>;
  movie: ResponseType<MovieResponseType | null>;
};

const AdminMovieAddPage: FC = () => {
  // naviagate
  const navigate = useNavigate();

  // loader
  const { theaters, genres, bonus, movie } = useLoaderData() as LoaderData;

  // state modal error
  const [modalError, setModalError] = useState<boolean>(false);

  // state message error
  const [messageError, setMessageError] = useState<string>("");

  // use hook form
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm<MovieCreateType | MovieUpdateType>({
    defaultValues: {
      title: movie?.data?.title || "",
      description: movie?.data?.description || "",
      price: String(movie?.data?.price ?? "") || "",
      genreId: String(movie?.data?.genres.id) || "",
      theaterId: movie?.data?.theaters.map((theater) => theater.id) || [],
      bonus: movie?.data?.bonus.map((bonus) => bonus.id) || [],
    },
    resolver: zodResolver(
      movie ? MovieValidation.UPDATE : MovieValidation.CREATE
    ),
  });

  // mutation
  const { isPending, mutateAsync } = useMutation({
    mutationFn: (formData: FormData) => {
      // call service
      if (movie) {
        return MovieService.update(movie?.data?.id || 0, formData);
      } else {
        return MovieService.create(formData);
      }
    },

    // error
    onError: (error) => {
      // cek error axios
      if (error instanceof AxiosError) {
        // cek status
        if (error.status === 400) {
          // set message error
          setMessageError(error.response?.data?.message);

          // set modal error
          setModalError(true);
        } else if (error.status === 401) {
          // navigate
          navigate("/signin");
        } else {
          console.log(error);
        }
      }
    },

    // success
    onSuccess: (data) => {
      console.log(data);

      // back
      navigate("/dashboard");
    },
  });

  // on submit
  const onSubmit = async (data: MovieCreateType | MovieUpdateType) => {
    try {
      // form data
      const formData = new FormData();
      if (data.thumbnail) {
        formData.append("thumbnail", data.thumbnail);
      }
      formData.append("title", data.title || "");
      formData.append("description", data.description || "");
      formData.append("price", String(data.price) || "");
      formData.append("genreId", String(data.genreId));
      formData.append("theaterId", JSON.stringify(data.theaterId));
      formData.append("bonus", JSON.stringify(data.bonus));

      // for (const [key, value] of formData.entries()) {
      //     console.log(key, value);
      // }

      //   mutation
      await mutateAsync(formData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full min-h-screen py-18 flex flex-col justify-start items-start px-2 gap-4">
      {/* header */}
      <HeaderDashboardData title="Add Data Movie" />

      {/* form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col justify-start items-start px-2"
      >
        {/* input thumbnail */}
        <Controller
          control={control}
          name="thumbnail"
          render={({ fieldState }) => (
            <InputThumbnail
              setValue={setValue}
              clearErrors={clearErrors}
              error={fieldState.error?.message}
              defaultValue={movie?.data?.url_thumbnail}
            />
          )}
        />

        {/* input title */}
        <InputComponent
          label="Title"
          name="title"
          register={register("title")}
          placeholder="Enter movie title"
          error={errors.title?.message}
          type="text"
        />

        {/* input about */}
        <InputTextArea
          label="About"
          name="description"
          register={register("description")}
          placeholder="Enter movie description"
          error={errors.description?.message}
        />

        {/* choose genre */}
        <Controller
          control={control}
          name="genreId"
          render={({ field, fieldState }) => (
            <InputChoose
              name="genreId"
              label="Genre"
              placeholder="Enter movie genre"
              fieldChoose={genres?.data ? genres?.data : []}
              error={fieldState.error?.message}
              setValue={setValue}
              clearErrors={clearErrors}
              ref={field.ref}
              defaultValue={movie?.data?.genres.name}
            />
          )}
        />

        {/* input price */}
        <InputComponent
          label="Price"
          name="price"
          register={register("price")}
          placeholder="Enter movie price"
          error={errors.price?.message}
          type="text"
        />

        {/* choose theater */}
        <Controller
          control={control}
          name="theaterId"
          render={({ fieldState }) => (
            <ChooseTheaters
              data={theaters?.data ? theaters?.data : []}
              setValue={setValue}
              clearErrors={clearErrors}
              error={fieldState.error?.message}
              defaultValue={movie?.data?.theaters}
            />
          )}
        />

        {/* choose bonus */}
        <Controller
          control={control}
          name="bonus"
          render={({ fieldState }) => (
            <ChooseBonus
              error={fieldState.error?.message}
              setValue={setValue}
              clearErrors={clearErrors}
              bonus={bonus?.data}
              defaultValue={movie?.data?.bonus}
            />
          )}
        />

        {/* time */}
        <Controller
          control={control}
          name="times"
          render={({ fieldState }) => (
            <InputTime
              name="times"
              setValue={setValue}
              clearErrors={clearErrors}
              error={fieldState.error?.message}
            />
          )}
        />

        {/* seats */}
        <InputComponent
          label="Seats"
          name="seats"
          register={register("seats")}
          placeholder="Enter movie seats"
          error={errors.seats?.message}
          type="text"
        />

        {/* button submit */}
        <div className="w-full mt-6">
          <ButtonSubmit label="Submit" isPending={isPending} />
        </div>
      </form>

      {/* modal error */}
      <ModalErrorUp
        handleClose={() => setModalError(false)}
        active={modalError}
        message={messageError}
      />
    </div>
  );
};

export default AdminMovieAddPage;

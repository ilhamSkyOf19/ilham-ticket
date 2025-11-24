import { useRef, useState, type ChangeEvent, type FC } from "react";

// icon
import userOCtagon from "../../assets/images/icons/user-octagon.svg";
import helpCenter from "../../assets/images/icons/24-support.svg";
import like from "../../assets/images/icons/like.svg";
import cards from "../../assets/images/icons/cards.svg";
import ButtonActionSetting from "../../components/ButtonActionSetting";
import HeaderPage from "../../components/HeaderPage";
import { useLoaderData, useNavigate } from "react-router-dom";
import type { ResponseType } from "../../types/types";
import type { SignResponseType } from "../../models/auth-model";
import { AuthService } from "../../services/auth.service";
import { MdEdit } from "react-icons/md";
import { FaUserLarge } from "react-icons/fa6";
import { IoAdd } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserValidation } from "../../validations/user-validation";
import { useMutation } from "@tanstack/react-query";
import { UserService } from "../../services/user.service";
import { FaCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

// type action
type Action = {
  icon: string;
  label: string;
  labelLink: string;
  link: string;
};

const SettingPage: FC = () => {
  // state preview
  const [preview, setPreview] = useState<string | null>(null);

  // active action
  const [activeAction, setActiveAction] = useState<boolean>(false);

  // ref input
  const refInput = useRef<HTMLInputElement>(null);

  // navigate
  const navigate = useNavigate();
  // user
  const user = useLoaderData() as ResponseType<SignResponseType | null>;

  const action: Action[] = [
    {
      icon: userOCtagon,
      label: "Edit My Profile",
      link: "/",
      labelLink: "edit",
    },
    { icon: like, label: "Special Rewards", link: "/", labelLink: "details" },
    {
      icon: helpCenter,
      label: "Help Center",
      link: "/",
      labelLink: "view all",
    },
    { icon: cards, label: "E-Wallet Settings", link: "/", labelLink: "manage" },
  ];

  // use form
  const { handleSubmit, setValue } = useForm<{ avatar: File }>({
    resolver: zodResolver(UserValidation.UPDATE_AVATAR),
  });

  // mutation fn
  const { mutateAsync } = useMutation({
    mutationFn: async (data: { avatar: File }) =>
      await UserService.updateAvatar(user.data?.id as number, data),
    onError: (error) => console.log(error),
    onSuccess: (data) => {
      if (data.status === "failed") return console.log(data.message);
      // set value
      setValue("avatar", new File([], ""));

      // set preview
      setActiveAction(false);
    },
  });

  // handle submit
  const onSubmit = async (data: { avatar: File }) => {
    try {
      // cek file
      if (!data.avatar) return;

      // use mutation
      await mutateAsync(data);
    } catch (error) {
      console.log(error);
    }
  };

  // handle input active
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // get file for preview
    const file = e.target.files?.[0];
    if (file) {
      // set preview
      setPreview(URL.createObjectURL(file));

      // set value
      setValue("avatar", file);

      // set active action
      setActiveAction(true);
    }
  };

  // handle delete avatar
  const handleDeleteAvatar = () => {
    // set preview
    setPreview(null);

    // set active action
    setActiveAction(false);

    // set value
    setValue("avatar", new File([], ""));
  };

  //   handle logout
  const handleLogout = async () => {
    try {
      // call service
      await AuthService.logout();
      // navigate
      navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-full bg-transparent flex flex-col justify-start items-start px-6 ">
      {/* header */}
      <HeaderPage label="Settings" />

      <div className="w-full flex flex-col justify-start items-center gap-6">
        {/* action if update avatar */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full h-3 flex flex-row justify-evenly items-center gap-22 mt-6"
        >
          {/* input file hidden */}
          <input
            ref={refInput}
            type="file"
            name=""
            id=""
            accept="image/*"
            onChange={handleChange}
            hidden={true}
          />

          {/* buttn action */}
          {/* button delete */}
          {activeAction && (
            <>
              <button type="button" onClick={handleDeleteAvatar}>
                <IoClose className="w-8 h-8 text-white" />
              </button>

              {/* button check */}
              <button type="submit">
                <FaCheck className="w-6 h-6 text-white" />
              </button>
            </>
          )}
        </form>
        <div className="w-32 h-32 relative flex flex-row justify-center items-center">
          {/* button add */}

          <button
            type="button"
            onClick={() => refInput.current?.click()}
            className="w-8 h-8 flex flex-row justify-center items-center absolute bottom-0 right-2 bg-white rounded-full"
          >
            {user?.data?.url_avatar === "" ? (
              <IoAdd className="w-6 h-6 text-black" />
            ) : (
              <MdEdit className="w-6 h-6 text-black" />
            )}
          </button>
          {/* img profile */}
          <div className="w-full h-full rounded-full bg-gray-300 overflow-hidden flex flex-row justify-center items-center">
            {user?.data?.url_avatar === "" && !preview ? (
              <FaUserLarge className="w-20 h-20 text-gray-400" />
            ) : (
              <img
                src={preview ? preview : user?.data?.url_avatar}
                alt="profile"
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>

        <div className="w-full flex flex-col justify-start items-center gap-2">
          {/* name */}
          <p className="text-white font-bold text-2xl capitalize">
            {user?.data?.name}
          </p>

          {/* email */}
          <p className="text-gray-400 font-medium text-base">
            {user?.data?.email}
          </p>
        </div>
      </div>

      {/* helper */}
      <div className="w-full flex flex-col justify-start items-start gap-6 mt-6">
        {/* edit profile */}
        {action.map((item: Action, index: number) => (
          <ButtonActionSetting
            key={index}
            icon={item.icon}
            link={item.link}
            label={item.label}
            labelLink={item.labelLink}
          />
        ))}
      </div>

      {/* button logout */}
      <button
        type="button"
        onClick={handleLogout}
        className="bg-white/10 rounded-full w-full py-3.5 text-center text-base font-bold text-white capitalize mt-6"
      >
        logout my account
      </button>
    </div>
  );
};

export default SettingPage;

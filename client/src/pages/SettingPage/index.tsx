import { type FC } from "react";

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

// type action
type Action = {
  icon: string;
  label: string;
  labelLink: string;
  link: string;
};

const SettingPage: FC = () => {
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
    <div className="w-full h-full bg-transparent flex flex-col justify-start items-start px-6 gap-6">
      {/* header */}
      <HeaderPage label="Settings" />

      <div className="w-full flex flex-col justify-start items-center gap-6">
        {/* img profile */}
        <div className="w-32 h-32 rounded-full bg-gray-300 mt-6 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZSUyMHBob3RvfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
            alt="profile"
            className="w-full h-full object-cover"
          />
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
      <div className="w-full flex flex-col justify-start items-start gap-6">
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
        className="bg-white/10 rounded-full w-full py-3.5 text-center text-base font-bold text-white capitalize"
      >
        logout my account
      </button>
    </div>
  );
};

export default SettingPage;

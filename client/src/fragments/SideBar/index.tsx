import clsx from "clsx";
import { type FC, type RefObject } from "react";
import { IoIosClose } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { AuthService } from "../../services/auth.service";

type Props = {
  ref: RefObject<HTMLDivElement>;
  sidebarOpen: boolean;
  handleSidebarToggle: () => void;
};
const SideBar: FC<Props> = ({ ref, sidebarOpen, handleSidebarToggle }) => {
  // navigate
  const navigate = useNavigate();
  // handle logout
  const handleLogout = async () => {
    try {
      // logout
      const response = await AuthService.logout();

      // cek response
      if (response.status === "success") {
        // close sidebar
        handleSidebarToggle();

        // redirect to login
        navigate("/signin");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      ref={ref}
      className={clsx(
        "w-[60%] h-screen fixed flex flex-col justify-start bg-white/10 backdrop-blur-2xl pt-3 transition-transform duration-300 ease-in-out z-30",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="w-full flex flex-row justify-between items-center px-2">
        {/* title */}
        <h2 className="text-white font-bold text-xl">Ilham Ticket</h2>

        {/* button close */}
        <button
          type="button"
          className="h-full flex flex-row justify-center items-center group"
          onClick={handleSidebarToggle}
        >
          <IoIosClose
            className={clsx(
              "text-white text-4xl transition-transform duration-1000 ease-in-out group-hover:scale-120",
              sidebarOpen ? "rotate-0" : "-rotate-180"
            )}
          />
        </button>
      </div>

      {/* content navigation */}
      <div className="w-full flex flex-col justify-start items-start mt-6">
        {/* navigation */}
        {/* dashboard home */}
        <NavigationSidebar
          link="/dashboard"
          title="dashboard"
          handleSidebarToggle={handleSidebarToggle}
        />

        {/* movie add */}
        <NavigationSidebar
          link="/dashboard/dashboard-movie-add"
          title="movie add"
          handleSidebarToggle={handleSidebarToggle}
        />

        {/* theater display */}
        <NavigationSidebar
          link="/dashboard/theater"
          title="list theater"
          handleSidebarToggle={handleSidebarToggle}
        />

        {/* theater display */}
        <NavigationSidebar
          link="/dashboard/bonus"
          title="list bonus"
          handleSidebarToggle={handleSidebarToggle}
        />

        {/* genre add */}
        <NavigationSidebar
          link="/dashboard/genre"
          title="list genre"
          handleSidebarToggle={handleSidebarToggle}
        />

        <button
          type="button"
          onClick={handleLogout}
          className="w-full font-bold text-white py-3 px-2 hover:bg-white/10 transition-colors duration-300 ease-in-out capitalize text-left"
        >
          logout
        </button>
      </div>
    </div>
  );
};

// navigation sidebar
type NavigationSidebarProps = {
  link: string;
  title: string;
  handleSidebarToggle: () => void;
};
const NavigationSidebar: FC<NavigationSidebarProps> = ({
  link,
  title,
  handleSidebarToggle,
}) => {
  return (
    <Link
      to={link}
      onClick={handleSidebarToggle}
      className="w-full font-bold text-white py-3 px-2 hover:bg-white/10 transition-colors duration-300 ease-in-out capitalize"
    >
      {title}
    </Link>
  );
};

export default SideBar;

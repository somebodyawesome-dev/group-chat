import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faDragon,
  faMoon,
  faSignOutAlt,
  faSun,
  faUserEdit,
  faUserPlus,
  faUserSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MouseEventHandler } from "react";
import { useAuthToken } from "../hooks/AuthToken";
import useDarkMode from "../hooks/DarkTheme";
type SideBarProps = {
  selectBoard?: (index: number) => void;
};
export default function SideBar({ selectBoard }: SideBarProps) {
  const { darkTheme, setDarkTheme } = useAuthToken();
  return (
    <div className="fixed top-0 left-0 h-screen w-20 m-0 flex flex-col bg-white dark:bg-gray-900 text-white  shadow-2xl z-10">
      <SideBarElement icon={faDragon} />
      <Divider />
      <SideBarElement
        icon={faUserPlus}
        tooltip="Add new user"
        onClick={() => {
          if (selectBoard) selectBoard(0);
        }}
      />
      <SideBarElement
        icon={faUserEdit}
        tooltip="Update user"
        onClick={() => {
          if (selectBoard) selectBoard(1);
        }}
      />
      <SideBarElement
        icon={faUserSlash}
        tooltip="Delete user"
        onClick={() => {
          if (selectBoard) selectBoard(2);
        }}
      />
      <Divider />
      {darkTheme ? (
        <SideBarElement
          icon={faSun}
          tooltip="dark theme"
          onClick={() => {
            setDarkTheme!(false);
          }}
        />
      ) : (
        <SideBarElement
          icon={faMoon}
          tooltip="light theme"
          onClick={() => {
            setDarkTheme!(true);
          }}
        />
      )}
      <SideBarElement icon={faSignOutAlt} tooltip="log out" />
    </div>
  );
}

type SideBarElementProp = {
  icon: IconDefinition;
  tooltip?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
};
const SideBarElement = ({ icon, tooltip, onClick }: SideBarElementProp) => {
  return (
    <div
      className="sidebar-element relative flex items-center justify-center 
    h-12 w-12 mt-2 mb-2 mx-auto  
  bg-gray-200 hover:bg-primarycolor dark:bg-gray-800 
  text-primarycolor hover:text-white
    hover:rounded-xl  rounded-3xl
    transition-all duration-300 ease-linear
    cursor-pointer shadow-lg group "
      onClick={onClick}
    >
      <div className="w-1/2 h-1/2 flex justify-center items-center">
        <FontAwesomeIcon icon={icon} />
      </div>

      {tooltip ? (
        <span className="absolute w-auto p-2 m-2 min-w-max left-14 rounded-md shadow-md text-primarycolor dark:text-white bg-gray-100 dark:bg-gray-900  text-base font-bold transition-all duration-100  origin-left scale-0 group-hover:scale-100">
          {tooltip}
        </span>
      ) : null}
    </div>
  );
};

export const Divider = () => (
  <hr className="border border-gray-300 dark:border-gray-800 rounded-full mx-2" />
);

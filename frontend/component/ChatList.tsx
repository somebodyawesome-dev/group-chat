import { AvatarGenerator } from "random-avatar-generator";
import { MouseEventHandler, useEffect, useState } from "react";
import Image from "next/image";

import { faMoon, faSearch, faSun } from "@fortawesome/free-solid-svg-icons";
import DropDownList from "./DropDownList";

import { useAuthToken } from "../hooks/AuthToken";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InboxData } from "../Models";
const generator = new AvatarGenerator();

type ChatListProps = {
  inboxesData: InboxData[];
  selectUser?: (index: number) => void;
};
export default function ChatList({ inboxesData, selectUser }: ChatListProps) {
  return (
    <div className="w-96 fixed h-screen flex flex-col  border-r border-gray-500 dark:bg-gray-700 dark:border-gray-500">
      <DisplayPersonalData />
      <GroupMemberContainer
        users={inboxesData}
        //event when contact is pressed
        selectUser={selectUser}
      />
    </div>
  );
}

function DisplayPersonalData() {
  const { darkTheme, setDarkTheme } = useAuthToken();
  return (
    <div className="flex justify-start items-center p-1 gap-x-2">
      <div className="relative w-14 h-14 flex-shrink-0 flex-grow-0">
        <RandomAvatar seeder="hamza" />
      </div>
      <TrimLongText message="somebodyawesome" />
      <button
        onClick={() => {
          setDarkTheme!(!darkTheme);
        }}
        className="p-0 px-3 w-14 h-10 rounded-xl text-primarycolor dark:text-white dark:hover:text-primarycolor bg-gray-200 dark:bg-gray-800 hover:scale-105 hover:bg-primarycolor hover:text-white transform transition-all duration-300"
      >
        <FontAwesomeIcon
          icon={darkTheme ? faMoon : faSun}
          //   className={`text-primarycolor dark:`}
        />
      </button>
    </div>
  );
}

export function RandomAvatar({ seeder }: { seeder?: string }) {
  const [avatar, setAvatar] = useState("/avatar.svg");
  useEffect(() => {
    setAvatar(generator.generateRandomAvatar(seeder));
  }, []);
  return <Image src={avatar} layout="fill" />;
}

type GroupMemberContainerProps = {
  users: InboxData[];
  selectUser?: (index: number) => void;
};
function GroupMemberContainer({
  users,
  selectUser,
}: GroupMemberContainerProps) {
  const [filteredUsers, SetFilteredUsers] = useState(users);
  const [filteredName, setFilteredName] = useState("");
  useEffect(() => {
    SetFilteredUsers(
      users.filter((value) => {
        return (
          filteredName === "" ||
          value.user?.name.toLowerCase().includes(filteredName.toLowerCase())
        );
      })
    );
  }, [filteredName]);

  return (
    <div className="p-1 min-h-0 relative  flex flex-col   ">
      {/*FIXME: fix drop down icon when filterItems=false} */}
      <DropDownList
        loading={false}
        title="Search..."
        icon={faSearch}
        filterItems={false}
        setSelection={(s) => {
          setFilteredName(s);
        }}
      />
      {/* contact list */}
      <div className="flex flex-col overflow-x-auto scrollbar scrollbar-thumb-primarycolor scrollbar-thin scrollbar-thumb-rounded ">
        {filteredUsers.map((val, index) => {
          return (
            <Contact
              index={index}
              username={val?.user?.name || "somebodyawesome"}
              key={`user-${val?.user?.name}`}
              lastMsg={val.lastMessage?.message}
              selectUser={selectUser}
            />
          );
        })}
      </div>
    </div>
  );
}
type ContactProps = {
  username: string;
  lastMsg?: string;
  index?: number;
  selectUser?: (index: number) => void;
};
function Contact({ username, lastMsg = "", selectUser, index }: ContactProps) {
  return (
    <div
      className="w-full p-1 rounded-xl transform transition-all duration-300  flex justify-start items-center gap-x-1 bg-white hover:bg-primarycolor   dark:bg-gray-700 dark:hover:bg-primarycolor"
      onClick={() => {
        if (selectUser) selectUser(index ?? 0);
      }}
    >
      <div className="relative w-16 h-16 flex-shrink-0 flex-grow-0">
        <RandomAvatar />
      </div>
      <div className="overflow-hidden  w-full flex flex-col justify-start items-center ">
        <TrimLongText
          message={username}
          textColor="text-black"
          textSize="text-base"
        />

        <TrimLongText
          textColor="text-gray-500"
          textSize="text-sm"
          message={lastMsg}
        />
      </div>
    </div>
  );
}

export function TrimLongText({
  message,
  textSize = "text-xl",
  textColor = "text-primarycolor",
}: {
  message: string;
  textSize?: string;
  textColor?: string;
}) {
  return (
    <h1
      style={{ textOverflow: "ellipsis" }}
      className={`p-0 w-full ${textSize} ${textColor} box-border dark:text-white font-bold font-sans overflow-hidden whitespace-nowrap `}
    >
      {message}
    </h1>
  );
}

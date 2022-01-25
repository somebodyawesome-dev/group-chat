import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import {
  deleteUser,
  searchForUsersByEmail,
} from "../controllers/UserController";
import { useAuthToken } from "../hooks/AuthToken";
import { Toaster } from "../libs/Toast";
import { IUser } from "../Models";
import DropDownList from "./DropDownList";
import FormButton from "./FormButton";

export default function DeleteUserForm() {
  const { darkTheme } = useAuthToken();
  const [selectedEmail, setSelectedEmail] = useState("");
  const [searchedUsers, setSearchedUser] = useState<IUser[]>([]);

  const [searching, setSearching] = useState(false);
  const [updating, setUpdating] = useState(false);
  return (
    <div className="w-full h-full p-10 flex justify-center items-center bg-gray-100 dark:bg-gray-800  ">
      <form
        autoComplete="off"
        action=""
        className="p-8 w-1/2 shadow-2xl rounded-lg flex justify-center items-center flex-col bg-white  dark:bg-gray-900 "
      >
        <DropDownList
          title="Email..."
          items={searchedUsers?.map((value) => value!.email)}
          value={selectedEmail}
          loading={searching}
          setSelection={async (s: string) => {
            //search for email
            setSelectedEmail(s);
            //trick to trigger animation
            //TODO make that animation XD
            setSearching(true);
            setSearchedUser([]);
            //prevent some error
            if (s === "") {
              setSearching(false);
              return;
            }
            setSearchedUser(await searchForUsersByEmail(s));
            setSearching(false);
          }}
          icon={faUser}
        />
        <FormButton
          loading={searching}
          message="Delete user"
          onClick={async (ev) => {
            if (selectedEmail === "") {
              Toaster("warning", "Email field is missing", darkTheme);
              return;
            }
            const selectedUser: IUser =
              searchedUsers.filter((value) => {
                return value?.email === selectedEmail;
              })[0] ?? null;

            if (!selectedUser) {
              Toaster("error", "User doesn't exist", darkTheme);
              return;
            }

            setSearching(true);
            if ((await deleteUser(selectedEmail)) === 1) {
              Toaster("success", "User deleted", darkTheme);
              setSelectedEmail("");
            } else {
              Toaster(
                "error",
                "something went wrong while deleting user",
                darkTheme
              );
            }
            setSearching(false);
          }}
        />
      </form>
    </div>
  );
}

import {
  faClosedCaptioning,
  faEnvelope,
  faUser,
  faUserAlt,
  faWindowClose,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import {
  addUser,
  searchForUsersByEmail,
  updateUser,
} from "../controllers/UserController";
import { useAuthToken } from "../hooks/AuthToken";
import { ErrorHandler } from "../libs/ErrorHandler";
import { Toaster } from "../libs/Toast";
import { IGroup, IUser } from "../Models";
import DropDownList from "./DropDownList";
import FormButton from "./FormButton";
import FormInput from "./FormInput";
type UpdateUserFormProps = {
  groups: IGroup[];
};
export default function UpdateUserForm({ groups }: UpdateUserFormProps) {
  const { darkTheme } = useAuthToken();
  const [selectedEmail, setSelectedEmail] = useState("");
  const [searchedUsers, setSearchedUser] = useState<IUser[]>([]);

  const [searching, setSearching] = useState(false);
  const [updating, setUpdating] = useState(false);

  //update form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [group, setGroup] = useState("");
  const [loading, setLoading] = useState(false);
  const validator = () => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return (
      name !== "" &&
      re.test(email.toLowerCase()) &&
      groups
        .map((grp) => {
          return grp.name;
        })
        .includes(group)
    );
  };

  return (
    <div className="w-full h-full   p-10 flex justify-center items-center bg-gray-100 dark:bg-gray-800  ">
      {!updating ? (
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
            message="fetch user data"
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
              setName(selectedUser.name);
              setEmail(selectedUser.email);
              setGroup(selectedUser.group);
              setUpdating(true);
            }}
          />
        </form>
      ) : (
        <form
          autoComplete="off"
          action=""
          className="relative p-8 w-1/2 shadow-2xl rounded-lg flex justify-center items-center flex-col bg-white  dark:bg-gray-900 "
        >
          <div className="absolute transform transition-all m-0 w-8 hover:w-12 h-[80%] border-l-2 border-b-2 border-t-2 border-primarycolor  bg-white dark:bg-gray-900 rounded-tl-lg rounded-bl-lg left-0 -translate-x-full  ">
            <button
              className="w-full h-full m-2 flex justify-center items-center text-primarycolor"
              onClick={() => {
                setUpdating(false);
              }}
            >
              <FontAwesomeIcon icon={faWindowClose} />
            </button>
          </div>
          <div className="w-full">
            <FormInput
              value={name}
              icon={faUserAlt}
              placeHolder="Name..."
              onChange={(ev) => {
                setName(ev.target.value);
              }}
            />
          </div>
          <div className="w-full">
            <FormInput
              value={email}
              icon={faEnvelope}
              placeHolder="E-mail..."
              onChange={(ev) => {
                setEmail(ev.target.value);
              }}
            />
          </div>
          <div className="w-full">
            <DropDownList
              title="Group..."
              items={groups.map((v) => {
                return v.name;
              })}
              value={group}
              setSelection={(s: string) => {
                setGroup(s);
              }}
            />
          </div>
          <FormButton
            message="Update"
            loading={loading}
            onClick={async (ev) => {
              setLoading(true);
              if (validator()) {
                //TODO handle error
                try {
                  await updateUser({ name, email, group, role: "etudiant" });
                  Toaster("success", "user updated succesfuly !", darkTheme);
                  setUpdating(false);
                } catch (error: any) {
                  ErrorHandler(error);
                  Toaster("error", error.response.data.message, darkTheme);
                  // const errors = Object.keys(error.response.data.errors || {});
                  // let errorMsg = "";
                  // for (const k of errors) {
                  //   errorMsg += `${k} : ${error.response.data.errors[k]}`;
                  //   Toaster("error", errorMsg, darkTheme);
                  // }
                }
              } else {
                Toaster(
                  "warning",
                  "one or more of the fields are not valide !",
                  darkTheme
                );
              }
              setLoading(false);
              //TODO case where some field is not valide
            }}
          />
        </form>
      )}
    </div>
  );
}

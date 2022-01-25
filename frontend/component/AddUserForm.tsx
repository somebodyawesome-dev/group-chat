import {
  faEnvelope,
  faHandMiddleFinger,
  faKey,
  faUserAlt,
  faUsers,
  faVoicemail,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

import { addUser } from "../controllers/UserController";
import { IGroup } from "../Models";
import DropDownList from "./DropDownList";
import FormInput from "./FormInput";

import { useAuthToken } from "../hooks/AuthToken";
import { Toaster } from "../libs/Toast";
import { ErrorHandler } from "../libs/ErrorHandler";
import FormButton from "./FormButton";

type AddUserFormProps = {
  groups: IGroup[];
};

export default function AddUserForm({ groups }: AddUserFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [group, setGroup] = useState("");
  const [loading, setLoading] = useState(false);
  const { darkTheme } = useAuthToken();

  // const [password, setPassword] = useState("");
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
    <div className="w-full h-full p-10 flex justify-center items-center bg-gray-100 dark:bg-gray-800  ">
      <form
        autoComplete="off"
        action=""
        className="p-8 w-1/2 shadow-2xl rounded-lg flex justify-center items-center flex-col bg-white  dark:bg-gray-900 "
      >
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
            icon={faUsers}
          />
        </div>
        <FormButton
          message="Create User"
          loading={loading}
          onClick={async (ev) => {
            setLoading(true);
            if (validator()) {
              //TODO handle error
              try {
                await addUser({ name, email, group, role: "etudiant" });
                Toaster("success", "user added succesfuly !", darkTheme);
                setName("");
                setGroup("");
                setEmail("");
              } catch (error: any) {
                ErrorHandler(error);
                Toaster("error", error.response.data.message, darkTheme);
                const errors = Object.keys(error.response.data.errors || {});
                let errorMsg = "";
                for (const k of errors) {
                  errorMsg += `${k} : ${error.response.data.errors[k]}`;
                  Toaster("error", errorMsg, darkTheme);
                }
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
    </div>
  );
}

//TODO create validator
//TODO complete adduser in  usercontroller

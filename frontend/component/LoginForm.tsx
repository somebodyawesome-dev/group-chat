import React, { useState } from "react";
import Router from "next/router";

import axios from "axios";
import { useAuthToken } from "../hooks/AuthToken";
import { ErrorHandler } from "../libs/ErrorHandler";
import { IAuthContext } from "./AuthProvider";
import FormInput from "./FormInput";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const authConext = useAuthToken();
  return (
    <div className="flex w-full h-full justify-evenly items-center">
      <div className="hidden md:flex transition-all duration-500 transform justify-center items-center">
        <img
          src="messaging_logo.svg"
          className=" w-1/2 hover:scale-110 transition-all duration-500 transform"
          alt=""
        />
      </div>
      <div className=" w-1/2">
        <form
          action={process.env.NEXT_PUBLIC_BACKEND_DOMAIN + "/login"}
          method="POST"
          className="flex flex-col justify-center items-center  "
          onSubmit={async (ev) => {
            ev.preventDefault();
            try {
              const res = await axios.post(
                process.env.NEXT_PUBLIC_BACKEND_DOMAIN + "/login",
                {
                  email,
                  password,
                }
              );
              console.log(res.data);

              const { token, user } = res.data as IAuthContext;

              authConext.setToken!(token);
              authConext.setUser!(user);
              if (user?.role === "admin") Router.push("/admin");
              else Router.push("/chat");
            } catch (error) {
              ErrorHandler(error);
            }
          }}
        >
          <img src="avatar.svg" className="w-32 m-6" />
          <FormInput
            placeHolder="Email"
            type="email"
            icon={faUser}
            onChange={(ev) => {
              setEmail(ev.target.value);
            }}
            useDarkTheme={false}
          />
          <FormInput
            placeHolder="Password"
            type="password"
            icon={faLock}
            onChange={(ev) => {
              setPassword(ev.target.value);
            }}
            useDarkTheme={false}
          />

          <input
            type="submit"
            value="Log in"
            className="mb-5 p-1 pl-5 pr-5 bg-transparent border-2 border-primarycolor text-primarycolor text-lg rounded-lg transition-colors duration-700 transform hover:bg-primarycolor hover:text-gray-100 focus:border-4 focus:border-primarycolor"
          />
        </form>
      </div>
    </div>
  );
};
export default LoginForm;

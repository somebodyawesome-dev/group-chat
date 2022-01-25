import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { IUser } from "../Models";
import { useAuthToken } from "./AuthToken";

export type UserHook = {
  token: string | null;
  user: IUser;
  setToken?: (s: string) => void;
  setUser?: (u: IUser) => void;
  isLoggedIn?: () => boolean;
};
export function useUser(): UserHook {
  const authContext = useAuthToken();

  return {
    token: authContext.token,
    user: authContext.user,
    setToken: authContext.setToken,
    setUser: authContext.setUser,
    isLoggedIn: authContext.isLoggedIn,
  };
}

import axios from "axios";
import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useCookies } from "react-cookie";
import { IUser } from "../Models";

export interface IAuthContext {
  token: string | null;
  user: IUser;
  darkTheme: boolean;
  setToken?: (s: string | null) => void;
  setUser?: (u: IUser) => void;
  setDarkTheme?: (theme: boolean) => void;
  isLoggedIn?: () => boolean;
}

const defaultAuthState: IAuthContext = {
  token: null,
  user: null,
  darkTheme: false,
};

export const AuthContext = createContext<IAuthContext>(defaultAuthState);

type AuthProps = {
  children: ReactNode;
};
export const AuthProvider: FC<AuthProps> = ({ children }) => {
  const [cookie, setCookie, removeCookie] = useCookies([
    "token",
    "user",
    "dark",
  ]);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<IUser>(null);
  const [darkTheme, setDarkTheme] = useState(false);
  useEffect(() => {
    setToken(cookie.token || null);
    setUser(cookie.user || null);
    setDarkTheme(cookie.dark ? (JSON.parse(cookie.dark) as boolean) : false);
  }, []);
  useEffect(() => {
    const className = "dark";
    const bodyClass = window.document.body.classList;
    darkTheme === true ? bodyClass.add(className) : bodyClass.remove(className);
  }, [darkTheme]);
  return (
    <AuthContext.Provider
      value={{
        token,
        setToken: (s: string | null) => {
          setToken(s);
          s
            ? setCookie("token", s, { path: "/", maxAge: 31536000 })
            : removeCookie("token");
        },
        user,
        setUser: (u: IUser) => {
          setUser(u);
          u
            ? setCookie("user", u, { path: "/", maxAge: 31536000 })
            : removeCookie("user");
        },
        isLoggedIn: () => {
          return token ? true : false;
        },
        darkTheme,
        setDarkTheme: (b: boolean) => {
          setDarkTheme(b);
          setCookie("dark", b, { path: "/", maxAge: 31536000 });
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

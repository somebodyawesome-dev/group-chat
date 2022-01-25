import { useContext } from "react";
import { AuthContext } from "../component/AuthProvider";

export const useAuthToken = () => useContext(AuthContext);

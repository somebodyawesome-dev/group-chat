import axios from "axios";
import { Cookies } from "react-cookie";
import { useAuthToken } from "../hooks/AuthToken";
import { ErrorHandler } from "../libs/ErrorHandler";
import { InboxData, IUser } from "../Models";
/**
 *
 * @throws {Error}
 */
export async function addUser(user: IUser) {
  const token = new Cookies().get("token");
  if (!token) throw new Error("You are not logged in");

  return await request<any>("post", token, "/register", user);
}
export async function updateUser(user: IUser) {
  const token = new Cookies().get("token");
  if (!token) throw new Error("You are not logged in");

  return await request<any>("put", token, `/users/${user?.email}`, user);
}

export async function searchForUsersByEmail(email: string): Promise<IUser[]> {
  const token = new Cookies().get("token");
  if (!token) throw new Error("You are not logged in");

  return await request<IUser[]>("get", token, `/users/search/${email}`);
}
export async function deleteUser(email: string) {
  const token = new Cookies().get("token");
  if (!token) throw new Error("You are not logged in");

  return await request<any>("delete", token, `/users/${email}`);
}

export async function getRole(token: string) {
  if (!token) throw new Error("You are not logged in");
  return (await request<{ role: string }>("post", token, "/role", null)).role;
}

export async function getGroupMembers(token: string) {
  if (!token) throw new Error("You are not logged in");
  return await request<InboxData[]>("get", token, "/group/users");
}

export async function request<Type>(
  method: "get" | "post" | "delete" | "put",
  token: string,
  api: string,
  body?: any
): Promise<Type> {
  if (method === "get") {
    return (
      await axios.get<Type>(process.env.NEXT_PUBLIC_BACKEND_DOMAIN + api, {
        headers: { Authorization: `Bearer ${token}` },
      })
    ).data;
  }
  if (method === "post") {
    return (
      await axios.post<Type>(
        process.env.NEXT_PUBLIC_BACKEND_DOMAIN + api,
        body,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
    ).data;
  }
  if (method === "put") {
    return (
      await axios.put<Type>(
        process.env.NEXT_PUBLIC_BACKEND_DOMAIN + api,
        body,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
    ).data;
  }

  //send delete request
  return (
    await axios.delete<Type>(process.env.NEXT_PUBLIC_BACKEND_DOMAIN + api, {
      headers: { Authorization: `Bearer ${token}` },
    })
  ).data;
}

import Head from "next/head";
import { GetServerSideProps } from "next";
import SideBar from "../component/SideBar";
import AddUserForm from "../component/AddUserForm";
import Error from "../component/Error";
import axios, { Axios, AxiosError } from "axios";
import { IGroup } from "../Models/";
import { useState } from "react";
import UpdateUserForm from "../component/UpdateUserForm";
import DeleteUserForm from "../component/DeleteUserForm";
import { getRole } from "../controllers/UserController";

export default function admin({ groups, statusCode, message }: AdminProps) {
  const [selectedBoard, setSelectedBoard] = useState(0);
  const boards = [
    <AddUserForm groups={groups ?? []} />,
    <UpdateUserForm groups={groups ?? []} />,
    <DeleteUserForm />,
  ];
  if (statusCode && message) {
    return <Error statusCode={statusCode} message={message} />;
  }
  return (
    <div className="dark:bg-gray-800 w-screen h-screen">
      <Head>
        <title>Admin dashboard</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SideBar
        selectBoard={(index: number) => {
          setSelectedBoard(index);
        }}
      />
      <div className="pl-20 w-full h-full  ">{boards[selectedBoard]}</div>
    </div>
  );
}

type AdminProps = { groups?: IGroup[]; message?: string; statusCode?: number };

export const getServerSideProps: GetServerSideProps<AdminProps> = async (
  context
) => {
  let statusCode = 500;
  let message = "Unauthorizied";
  try {
    //if  not admin
    if ((await getRole(context.req.cookies.token)) !== "admin") {
      statusCode = 500;
      message = "Unauthorizied";
      return {
        props: { statusCode, message },
      };
    }
    //if  admin
    //get all  groups
    const groupsResponse = await axios.get<IGroup[]>(
      process.env.NEXT_PUBLIC_BACKEND_DOMAIN + "/groups",
      { headers: { Authorization: `Bearer ${context.req.cookies.token}` } }
    );
    return {
      props: { groups: groupsResponse.data },
    };
  } catch (error: any) {
    statusCode = 500;
    message = "Uknown";
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      statusCode = error.response.status;
      message = error.response.data.message;
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
      statusCode = 500;
      message = "No response recieved";
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
      statusCode = 400;
      message = "Could not set up the request";
    }
    return {
      props: { message, statusCode },
    };
  }
};

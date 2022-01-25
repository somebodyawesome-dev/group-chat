import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import LoginForm from "../component/LoginForm";

const Login: NextPage = () => {
  return (
    <>
      <Head>
        <title>sign in</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-screen h-screen ">
        <img src="wave.svg" className="absolute  w-full h-full " alt="" />
        <LoginForm />
      </div>
    </>
  );
};

export default Login;
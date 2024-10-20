import React from "react";
import Footer from "./Footer";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import NavWrapper from './NavWrapper';


const SideBar = async () => {

  const user = await currentUser();
  if (!user) redirect("/sign-in");

  return (
    <section className="sidebar">
      <NavWrapper/>
      <Footer/>
    </section>
  );
};

export default SideBar;

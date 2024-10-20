import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Footer = async({type="desktop"}) => {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  return (
    <footer className="footer">
      <div className={type === "mobile" ? "footer_name-mobile" : "footer_name"}>
        <p className="text-xl font-bold text-gray-700">{user?.firstName?.[0] ?? ''}</p>
      </div>

      <div
        className={type === "mobile" ? "footer_email-mobile" : "footer_email"}
      >
        <h1 className="text-14 truncate text-blue-500 font-semibold">
          {user?.firstName + " " + user?.lastName}
        </h1>
        <p className="text-14 truncate font-normal text-blue-500">
          {user?.emailAddresses[0].emailAddress}
        </p>
      </div>
    </footer>
  );
};

export default Footer;

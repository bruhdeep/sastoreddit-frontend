import React from "react";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";

const restricted = () => {
  const user = Cookies.get("userId");
  if (user) {
    redirect("/post");
  }

  return <div></div>;
};

export default restricted;

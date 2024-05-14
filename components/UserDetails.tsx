"use client";

import React, { useEffect, useState } from "react";
import { profile } from "@/utils/user";

interface User {
  name: string;
  email: string;
  phoneNumber: string;
}

const UserDetails = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    profile().then((data: any) => {
      console.log(data);
      setUser(data);
    });
  }, []);
  return (
    <div className="bg-white shadow-md rounded-lg flex items-center justify-between">
      <div className="p-24">
        <h1 className="text-xl font-semibold mb-2">{user?.name}</h1>
        <h2 className="text-lg text-gray-800 mb-2">{user?.email}</h2>
        <h3 className="text-md text-gray-600">{user?.phoneNumber}</h3>
      </div>
      <button className="btn btn-primary">Edit Profile</button>
    </div>
  );
};

export default UserDetails;

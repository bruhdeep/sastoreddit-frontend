/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { IoIosNotifications } from "react-icons/io";
import CreatePost from "./CreatePost";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const userId = Cookies.get("userId");
    if (userId != null) {
      setIsAuthenticated(true);
    }
  }, [reloadKey]);

  const handleLogout = () => {
    Cookies.remove("userId");
    Cookies.remove("accessToken");
    Cookies.remove("role");
    router.push("/login");
    setTimeout(() => {
      setReloadKey((prevKey) => prevKey + 1);
    }, 2000);
  };

  return (
    <div key={reloadKey} className="text-black">
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link href={"/"}>
            <div className="btn btn-ghost text-xl">
              <p>sastoREDDIT</p>
            </div>
          </Link>
        </div>
        <div className="flex-none">
          {isAuthenticated && <CreatePost />}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <div className="indicator">
                <IoIosNotifications size={32} />
              </div>
            </div>
            <div
              tabIndex={0}
              className="mt-3 z-[1] card card-compact dropdown-content w-96 bg-base-100 shadow"
            >
              <div className="card-body">
                <div className="bg-primary p-3 rounded-lg">
                  sushan le lado khaoy
                </div>
                <br />
                sushan ko sando lado
              </div>
            </div>
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {isAuthenticated && (
                <li>
                  <Link href={"/profile"}>
                    <div className="justify-between">Profile</div>
                  </Link>
                </li>
              )}
              {isAuthenticated && (
                <li>
                  <button onClick={handleLogout} className="justify-between">
                    Logout
                  </button>
                </li>
              )}
              {!isAuthenticated && (
                <li>
                  <Link href={"/login"}>
                    <div className="justify-between">Login</div>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

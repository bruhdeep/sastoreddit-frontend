/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import { IoIosNotifications } from "react-icons/io";

const Navbar = () => {
  return (
    <div className="text-black">
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link href={"/"}>
            <div className="btn btn-ghost text-xl">sastoREDDIT</div>
          </Link>
        </div>
        <div className="flex-none">
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
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

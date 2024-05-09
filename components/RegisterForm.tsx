/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Register = () => {
  console.log(process.env.BASE_URL);
  const [error, setError] = useState("");
  const router = useRouter();

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const username = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const confirmPassword = e.target[3].value;

    if (!isValidEmail(email)) {
      setError("Email is invalid");
      return;
    }

    if (!password || password.length < 8) {
      setError("Password is short. It should be atleast 8 characters long");
      return;
    }

    try {
      const url = process.env.BASE_URL + "/auth/register";
      const response = await fetch(
        `${url}?UserName=${username}&Email=${email}&Password=${password}&ConfirmPassword=${confirmPassword}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        // Registration successful, redirect to login page
        router.push("/login");
      } else {
        // Registration failed, display error message
        const data = await response.json();
        setError(data.message);
      }
    } catch (error) {
      setError("An error occurred during registration");
    }
  };

  return (
    <div className="h-screen flex text-primary">
      <div className="hidden lg:block w-[40%] bg-slate-400 m-3 rounded-xl overflow-hidden">
        {/* <img
          src="lisa.jpg"
          alt="registerimage"
          className=" w-screen object-cover"
        /> */}
      </div>
      <div className="flex m-auto">
        <div className="m-auto w-[80%] lg:w-[40rem]">
          <div className="text-center text-[3rem] font-extrabold">
            <span className="text-black">GET STARTED WITH </span>
            <span className="text-primary">SASTOREDDIT</span>
          </div>
          <br />
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 text-black"
          >
            <input
              type="text"
              placeholder="Username"
              className="input input-bordered w-full"
            />
            <input
              type="text"
              placeholder="Email"
              className="input input-bordered w-full"
            />
            <input
              type="text"
              placeholder="Password"
              className="input input-bordered w-full"
            />
            <input
              type="text"
              placeholder="Confirm Password"
              className="input input-bordered w-full"
            />
            <br />
            <button className="btn btn-primary">Reigster</button>

            {error && <div className="text-red-700">{error}</div>}

            <Link className="text-right text-black" href={"/login"}>
              Have an account? <span className="text-primary">Sign In</span>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

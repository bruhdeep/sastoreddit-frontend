/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
"use client";
import { useState } from "react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import Cookies from "js-cookie";

const Login = () => {
  const user = Cookies.get("userId");
  if (user) {
    redirect("/post");
  }

  const router = useRouter();
  const [error, setError] = useState("");

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    if (!isValidEmail(email)) {
      setError("Email is invalid");
      return;
    }

    if (!password || password.length < 8) {
      setError("Password is short.");
      return;
    }

    try {
      const url = process.env.BASE_URL + "/auth/login";
      const response = await fetch(
        `${url}?Email=${email}&Password=${password}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        console.log("Failed to login");
        console.log(errorMessage);
      } else {
        const data = await response.json();
        console.log(data);

        const userId = data.userID;
        const token = data.accessToken;
        const role = data.role;

        Cookies.set("userId", userId);
        Cookies.set("accessToken", token);
        Cookies.set("role", role);

        if (role === "Admin") {
          router.push("/admin");
        } else {
          router.push("/post");
        }
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="flex m-auto ">
        <div className="m-auto w-[80%] lg:w-[40rem]">
          <div className="text-center text-[3rem] font-extrabold">
            <span className="text-black">WELCOME </span>
            <span className="text-primary">BACK</span>
          </div>
          <br />
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 text-black"
          >
            <input
              type="text"
              placeholder="Email"
              className="input input-bordered w-full"
            />
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full"
            />
            <br />
            <button type="submit" className="btn btn-primary">
              Login
            </button>

            {error && <div className="text-red-700">{error}</div>}
            <Link className="text-right" href={"/register"}>
              <span className="text-primary">Forgot Password?</span>
            </Link>
            <Link className="text-right" href={"/register"}>
              Don't have an account?{" "}
              <span className="text-primary">Sign up</span>
            </Link>
          </form>
        </div>
      </div>
      <div className="hidden lg:block w-[40%] bg-slate-400 m-3 rounded-xl overflow-hidden h-[98]">
        <img
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Finvestorplace.com%2Fwp-content%2Fuploads%2F2022%2F05%2Freddit-1600.png&f=1&nofb=1&ipt=367d6c6cb4a7609c9765e364d9d9b3febd11b63950e581f3f8d725b398c758b5&ipo=images"
          alt="login image"
          className="w-screen object-cover h-full"
        />
      </div>
    </div>
  );
};

export default Login;

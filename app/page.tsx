import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-base-100">
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)",
        }}
      >
        <div className=""></div>
        <div className="hero-content text-center text-black">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
            <p className="mb-5">
              Login to your account or continue as a guest to explore posts.
            </p>
            <Link href={"/login"}>
              <button className="btn btn-primary mx-2">Login</button>
            </Link>
            <Link href={"/posts"}>
              <button className="btn btn-primary mx-2">
                Continue as guest
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

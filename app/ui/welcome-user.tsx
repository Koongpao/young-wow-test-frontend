"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export function WelcomeUser() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <div className="bg-slate-200 shadow-sm p-4 rounded-lg flex flex-col justify-start text-slate-600 my-2 min-w-[40vw]">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-xl font-bold">Welcome!</h2>
            <p className="text-gray-500">You are now logged in.</p>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                setIsLoggedIn(false);
              }}
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg w-[50%]"
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-row gap-x-4 items-center justify-center mt-2">
          <div>
            <Link href="/login" className="text-slate-800 text-xl font-bold">
            <button className="bg-white shadow-lg py-3 px-4 rounded-xl">Login</button>
            </Link>
          </div>
          <div>
            <Link href="/register" className="text-slate-800 text-xl font-bold">
            <button className="bg-white shadow-lg py-3 px-4 rounded-xl">Register</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

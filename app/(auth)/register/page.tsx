"use client";
import { registerUser } from "@/app/lib/controller";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [responseMessage, setResponseMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await registerUser(username, email, password);
    const jsonResponse = await response?.json();
    setResponseMessage(jsonResponse.message);
    if (response?.status === 201) {
      router.replace("/");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center my-12">
      <h2 className="text-slate-700 font-bold text-4xl mb-24 gap-y-2">Register</h2>
      {responseMessage && <p className="text-slate-700 font-semibold">{responseMessage}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-y-2">
        <div>
          <label htmlFor="username" className="text-slate-600 font-semibold">
            Username:
          </label>
          <input
            className="bg-white shadow-lg py-3 px-4 rounded-xl text-slate-800"
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="text-slate-600 font-semibold">
            Email:
          </label>
          <input
            className="bg-white shadow-lg py-3 px-4 rounded-xl text-slate-800"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="text-slate-600 font-semibold">
            Password:
          </label>
          <input
            className="bg-white shadow-lg py-3 px-4 rounded-xl text-slate-800"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-white text-slate-700 text-xl font-semibold py-2 px-6 mt-8 rounded-xl shadow-lg"
        >
          Register
        </button>
      </form>
    </div>
  );
}

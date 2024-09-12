"use client";
import { useEffect, useState } from "react";
import { createPost } from "../lib/controller";

export default function Page() {
  const [token, setToken] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [responseMessage, setResponseMessage] = useState<string>("");

  useEffect(() => {
    setToken(localStorage.getItem("token") || "");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await createPost(title, content);
    const jsonResponse = await response?.json();
    setResponseMessage(jsonResponse.message);
    if (response?.status === 201) {
      setTitle("");
      setContent("");
    }
  };

  return (
    <div>
      <div className="flex flex-col bg-slate-300 items-center justify-start min-h-screen p-8 gap-y-6 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <h1 className="text-4xl font-bold text-slate-600">Post Something...</h1>
        <div>
          <a href="/" className="text-slate-800 text-xl font-bold">
            <button className="bg-white shadow-lg py-3 px-4 rounded-xl">Back to home</button>
          </a>
        </div>
        {responseMessage && <p className="text-slate-700 font-semibold text-2xl">{responseMessage}</p>}
        {token !== "" ? (
          <form className="flex flex-col justify-center text-center w-[50vw] gap-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Title"
              className="bg-white shadow-lg py-3 px-4 rounded-xl text-slate-800"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Content"
              className="bg-white shadow-lg py-3 px-4 rounded-xl h-[20vh] text-slate-800"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <button
              type="submit"
              className="bg-white shadow-lg py-3 px-4 rounded-xl text-slate-800"
            >
              Submit
            </button>
          </form>
        ) : (
          <div className="text-slate-700 text-2xl font-bold">You are not logged in</div>
        )}
      </div>
    </div>
  );
}

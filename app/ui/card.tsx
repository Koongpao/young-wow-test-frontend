"use client";
import { useState, useEffect } from "react";
import { TPosts } from "../lib/definitions";
import { getUserIdFromToken, getUserNameFromToken } from "../lib/scripts";
import { deletePost } from "../lib/controller";

interface cardProps {
  cardInfo: TPosts;
}

export function Card({ cardInfo }: cardProps) {
  const [userId, setUserId] = useState<number | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token") || "";
    setUserId(getUserIdFromToken(token));
    setUserName(getUserNameFromToken(token));
  }, []);

  const handleDelete = async () => {
    const response = await deletePost(cardInfo.id.toString());
    if (response?.status === 204) {
      window.location.reload();
    }
  };

  return (
    <div className="bg-slate-200 shadow-sm p-4 rounded-lg flex flex-col justify-start text-slate-600 my-2 min-w-[40vw]">
      <h2 className="text-xl font-bold">{cardInfo.title}</h2>
      <div className="flex flex-row gap-x-2">
        <p className="text-gray-500">By {cardInfo.username}</p>
        {cardInfo.username === userName && <p className="font-bold">(You)</p>}
      </div>
      <p className="text-gray-500">{cardInfo.content}</p>
      {cardInfo.user_id === userId && (
        <div className="text-red-600 cursor-pointer" onClick={() => handleDelete()}>
          Delete This Post
        </div>
      )}
      {cardInfo.user_id === userId && (
        <a href={`/edit/${cardInfo.id}`} className="text-blue-500 cursor-pointer">
          Edit This Post
        </a>
      )}
    </div>
  );
}

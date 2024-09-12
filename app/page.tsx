import { getAllPosts } from "../app/lib/controller";
import { Card } from "../app/ui/card";
import { WelcomeUser } from "./ui/welcome-user";
import { TPosts } from "./lib/definitions";
import Link from "next/link";

export default async function Home() {
  const posts: TPosts[] = await getAllPosts();

  return (
    <div className="flex flex-col bg-slate-300 items-center justify-center min-h-screen p-8 gap-y-6 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col justify-center text-center">
        <h1 className="text-4xl font-bold text-slate-600">Young Wow Software Engineer Test</h1>
        <h1 className="text-4xl font-bold text-slate-600">Social Media App</h1>
        <WelcomeUser />
      </div>
      <div>
        <Link href="/post" className="text-slate-800 text-xl font-bold">
          <button className="bg-white shadow-lg py-3 px-4 rounded-xl">Post New Content</button>
        </Link>
      </div>

      <div className="flex flex-col justify-center">
        {posts?.map((post: TPosts) => (
          <Card key={post.id} cardInfo={post} />
        ))}
      </div>
    </div>
  );
}

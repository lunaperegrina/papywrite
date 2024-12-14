import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Post, User } from "interfaces";
import LoginButton from "@/components/login-button";

export default async function Home() {

  const posts: Post[] = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/post`,
    { next: { revalidate: 10 } },
  ).then((res) => res.json());

  const users: User[] = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user`,
    { next: { revalidate: 10 } },
  ).then((res) => res.json());

  return (
    <>
      <div className="h-screen max-w-7xl mx-auto flex flex-col">
        <nav className="flex flex-row border-b border-stone-900 py-5 px-8 justify-between">
          <h1 className="font-lora text-2xl font-semibold tracking-tight cursor-pointer">
            Papywrite
          </h1>
          <ul className="flex flex-row gap-4 items-center">
            <li>
              Sign In
            </li>
            <li>
              <LoginButton />
            </li>
          </ul>
        </nav>

        <div className="flex flex-col flex-1 justify-center mx-16">
          <div className="flex flex-col gap-4 items-start">
            <div>
              <h1 className="font-lora text-7xl font-bold text-stone-800 dark:text-stone-200">
                A platform
              </h1>
              <h1 className="font-lora text-8xl font-bold text-stone-800 dark:text-stone-200">
                for <span className="underline">
                  writers
                </span>
                <span className="animate-pulse duration-40">|</span>
              </h1>
            </div>
            <p className="text-stone-600 dark:text-stone-400">
              Papywrite is a platform for writers to share their thoughts and ideas.
            </p>
            <LoginButton />
          </div>
        </div>

        <footer className="flex flex-row justify-center text-stone-600 dark:text-stone-400 font-lora border-t border-stone-900 py-5">
          <span>
            Made with ❤️ by
          </span>
          <span className="font-semibold ml-1 underline cursor-pointer">
            <Link href={"https://lunaperegrina.dev"} target="_blank">
              Luna Peregrina
            </Link>
          </span>
        </footer>
      </div>

      {/* 
      <section className="bg-white dark:bg-stone-950 py-12 md:py-20 px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-stone-800 dark:text-stone-200 mb-8">
            Autores publicados
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {users.slice(0, 4).map((user) => (
              <Link key={user.id} href={`/profile/${user.username}`}>
                <div
                  key={user.id}
                  className="flex flex-col items-center cursor-pointer"
                >
                  <img
                    alt="Author"
                    className="rounded-full mb-4"
                    height={80}
                    src={user.avatar as string}
                    style={{
                      aspectRatio: "80/80",
                      objectFit: "cover",
                    }}
                    width={80}
                  />
                  <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200 mb-2">
                    {user.name}
                  </h3>
                  <p className="text-stone-600 dark:text-stone-400 text-sm">
                    {user.role}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-stone-100 dark:bg-stone-900 py-12 md:py-20 px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-stone-800 dark:text-stone-200 mb-8">
            Últimos posts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(0, 3).map((post) => (
              <div
                key={post.id}
                className="bg-white dark:bg-stone-950 rounded-lg shadow-md overflow-hidden"
              >
                <img
                  alt="Post"
                  className="w-full h-48 object-cover"
                  height={225}
                  src={post.banner as string}
                  style={{
                    objectFit: "cover",
                  }}
                  width={400}
                />
                <div className="p-6">
                  <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200 mb-2">
                    {post.title}
                  </h3>
                  <p className="text-stone-600 dark:text-stone-400 mb-4">
                    {post.description?.trim().substring(0, 50)}...
                  </p>
                  <Link href={`/profile/${users.find((user) => user.id === post.author_id)?.username}/${post.slug}`}>
                    <Button variant="link">Ler post</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <footer className="bg-gray-800 dark:bg-gray-950 text-gray-400 py-8 px-6 md:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <BookIcon className="h-6 w-6 mr-2" />
            <span className="text-lg font-bold">Papywrite</span>
          </div>
          <nav className="flex space-x-4">Escreva sobre o que quiser</nav>
        </div>
      </footer> */}
    </>
  );
}

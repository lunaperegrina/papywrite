"use server";
import {
	TypographyH2,
	TypographyH3,
	TypographySmall,
} from "@/components/Typography";
import Link from "next/link";
import { Post, User } from "interfaces";
import { Button } from "@/components/ui/button";
import { Link as LinkIcon } from "lucide-react"
import { redirect } from "next/navigation";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import Navbar from "@/components/navbar";

export default async function page(
	{ params }: {
		params: { slug: string[] }
	}) {

	if (params.slug === undefined) {
		return redirect("/");
	}

	const user: User = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/user/username/${params.slug[0]}`,
	).then((res) => res.json());

	const posts: Post[] = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/post/author/${user.id}`,
	).then((res) => res.json());


	return (
		<div className="max-w-xl mx-auto mt-8 max-sm:mx-8">

			<Navbar  />

			{params.slug.length === 1 && (
				<div className="flex flex-row mb-8 justify-between mx-auto">
					<div className="flex flex-col gap-0">
						<div className="font-bold text-2xl">{user.name}</div>
						<div className="flex content-center items-center mb-4">
							<div className="text-gray-500 font-light text-sm">
								@{user.username}
							</div>
							<Dialog>
								<DialogTrigger asChild>
									<Button variant={"link"}>
										links
									</Button>
								</DialogTrigger>
								<DialogContent className="sm:max-w-[425px]">
									<DialogHeader>
										<DialogTitle>Links de redes</DialogTitle>
									</DialogHeader>
									<div className="grid gap-4 py-4">
										{Array.from({ length: 3 }).map(() => (
											<div
												key={Math.random()}
												className="flex flex-row gap-2" >
												<LinkIcon />
												<div>
													<div className="font-bold">
														Link test
													</div>
													<div className="text-sm text-gray-500">
														https://lunaperegrina.dev
													</div>
												</div>
											</div>
										))}
									</div>
								</DialogContent>
							</Dialog>

						</div>
						<div className="text-gray-800 font-light text-sm">{user.bio}</div>
					</div>
					<div>
						<img
							src={user.avatar as string}
							alt={user.name as string}
							width={80}
							height={80}
							className="rounded-full"
						/>
					</div>
				</div>
			)}

			<div className="mx-auto mb-28">
				{params.slug.length === 1 ? (
					<>
						<TypographyH2 className="mb-8 px-4">Artigos</TypographyH2>
						{posts.map((post: Post) => (
							<Link
								href={`/profile/${params.slug}/${post.slug}`}
								key={post.id}
								className="mx-auto flex flex-col dark:hover:bg-slate-800 light:hover:bg-slate-400 py-6 px-4 border-t-2"
							>
								<TypographyH3>{post.title}</TypographyH3>

								<TypographySmall className="pt-2 text-slate-400">
									{post.content?.trim().substring(0, 100)}...
								</TypographySmall>
							</Link>
						))}
					</>
				) : (
					<>
						{params.slug[1] && (
							<>
								<img
									src={
										posts.find((post: Post) => post.slug === params.slug[1])
											?.banner as string
									}
									alt={
										posts.find((post: Post) => post.slug === params.slug[1])
											?.title as string
									}
									width={1000}
									height={100}
									className="rounded-md object-cover h-[200px] w-full mb-8"
								/>
								<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
									{
										posts.find((post: Post) => post.slug === params.slug[1])
											?.title
									}
								</h1>
								<p className="leading-7 [&:not(:first-child)]:mt-6">
									{
										posts.find((post: Post) => post.slug === params.slug[1])
											?.content
									}
								</p>
							</>
						)}
					</>
				)}
			</div>
		</div>
	);
}

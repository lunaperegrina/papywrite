"use server";
import {
	TypographyH1,
	TypographyH2,
	TypographyH3,
	TypographyInlineCode,
	TypographySmall,
} from "@/components/Typography";
import Link from "next/link";
import { Post, User } from "interfaces";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/theme-button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuGroup, DropdownMenuShortcut, DropdownMenuSubTrigger, DropdownMenuSubContent, DropdownMenuPortal, DropdownMenuSub } from "@/components/ui/dropdown-menu";
import {
	Cloud,
	CreditCard,
	Github,
	Keyboard,
	LifeBuoy,
	LogOut,
	Mail,
	MessageSquare,
	Plus,
	PlusCircle,
	Settings,
	User as UserIcon,
	UserPlus,
	Users,
	Link as LinkIcon,
	Share,
	ChevronLeft
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Moon, Sun } from "lucide-react"
import { redirect } from "next/navigation";
import BackButton from "@/components/back-button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

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

			<nav className="mb-8 flex flex-row gap-2 justify-between">
				<BackButton />
				<div className="flex flex-row gap-2">
					{/* <ModeToggle /> */}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Avatar className="cursor-pointer">
								<AvatarImage src="https://github.com/lunaperegrina.png" />
								<AvatarFallback>CN</AvatarFallback>
							</Avatar>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-56">
							<DropdownMenuLabel>My Account</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								<DropdownMenuItem>
									<UserIcon />
									<span>Profile *</span>
									{/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
								</DropdownMenuItem>
								<DropdownMenuSub>
									<DropdownMenuSubTrigger>
										<Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
										<Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
										<span>Theme</span>
									</DropdownMenuSubTrigger>
									<DropdownMenuPortal>
										<DropdownMenuSubContent>
											<ModeToggle />
										</DropdownMenuSubContent>
									</DropdownMenuPortal>
								</DropdownMenuSub>
								<DropdownMenuItem>
									<Settings />
									<span>Settings *</span>
									{/* <DropdownMenuShortcut>⌘S</DropdownMenuShortcut> */}
								</DropdownMenuItem>
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								<DropdownMenuSub>
									<DropdownMenuSubTrigger>
										<Share />
										<span>Share *</span>
									</DropdownMenuSubTrigger>
									<DropdownMenuPortal>
										<DropdownMenuSubContent>
											<DropdownMenuItem>
												<LinkIcon />
												<span>Copy Link</span>
											</DropdownMenuItem>
										</DropdownMenuSubContent>
									</DropdownMenuPortal>
								</DropdownMenuSub>
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<Github />
								<span>GitHub</span>
							</DropdownMenuItem>
							<DropdownMenuItem disabled>
								<Cloud />
								<span>API (soon)</span>
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<LogOut />
								<span>Log out *</span>
								{/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</nav>
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

"use client";

import { TypographyH1, TypographyH3 } from "@/components/Typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { redirect } from "next/dist/server/api-utils";
import { useState } from "react";

export default function page() {
	const [email, setEmail] = useState("");
	const [sendedEmail, setSendedEmail] = useState(false);

	// const handleSendMagicLink = async () => {
	// 	try {
	// 		const { error } = await supabase.auth.signInWithOtp({
	// 			email,
	// 			options: {
	// 				// set this to false if you do not want the user to be automatically signed up
	// 				shouldCreateUser: true,
	// 				emailRedirectTo: "https://example.com/welcome",
	// 			},
	// 		});

	// 		if (error) {
	// 			console.error("Erro ao enviar Magic Link:", error);
	// 			return;
	// 		}
	// 		setSendedEmail(true);
	// 		console.log("Magic Link enviado para:", email);
	// 	} catch (error) {
	// 		console.error("Erro inesperado:", error);
	// 	}
	// };

	return (
		<div className="flex flex-col gap-4 w-[300px] mx-auto">
			{sendedEmail ? (
				<TypographyH1>
					Link de acesso enviado! Verifique seu email/
				</TypographyH1>
			) : (
				<>
					<TypographyH3 className="text-center mb-2">
						Digite seu email
					</TypographyH3>
					<Input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Seu email"
					/>
					<Button
					// onClick={handleSendMagicLink}
					>
						Enviar Magic Link
					</Button>
				</>
			)}
		</div>
	);
}

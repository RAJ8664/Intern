import { NextResponse } from "next/server";
import ollama from "ollama";

export async function POST(req) {
	try {
		const { message } = await req.json();
		const response = await ollama.chat({
			model: "deepseek-r1:1.5b", //Change the model here.
			messages: [{ role: "user", content: message }],
		});
		return NextResponse.json({ message: response.message.content });
	} catch (error) {
		console.error("Ollama error:", error);
		return NextResponse.json(
			{ error: "Failed to get response" },
			{ status: 500 },
		);
	}
}

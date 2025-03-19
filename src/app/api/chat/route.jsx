import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
    try {
        const { message } = await req.json();

        if (!message) {
            return new Response(JSON.stringify({ error: "Message is required" }), { status: 400 });
        }

        console.log("🟢 Received message:", message);

        const apiKey = process.env.GEMINI_API_KEY;
        
        if (!apiKey) {
            console.error("🔴 API Key is missing!");
            return new Response(JSON.stringify({ error: "API Key is missing!" }), { status: 500 });
        }

        console.log(`🟢 Using API Key: ${apiKey.substring(0, 5)}...`);  // Print first few characters

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        console.log("🟢 Sending message to Gemini AI...");
        const chatSession = model.startChat({
            generationConfig: {
                temperature: 1,
                topP: 0.95,
                topK: 40,
                maxOutputTokens: 8192,
                responseMimeType: "text/plain",
            },
            history: [],
        });

        const result = await chatSession.sendMessage(message);

        if (!result || !result.response) {
            console.error("🔴 Error: Invalid AI response!");
            return new Response(JSON.stringify({ error: "Invalid AI response!" }), { status: 500 });
        }

        const aiResponse = result.response.text();
        console.log("🟢 AI Response:", aiResponse);

        return new Response(JSON.stringify({ response: aiResponse }), { status: 200 });
    } catch (error) {
        console.error("🔴 API Error:", error.message);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

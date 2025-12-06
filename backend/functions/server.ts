import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Anthropic from "@anthropic-ai/sdk";
import { functions, functionMap } from "./index";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
});

app.post("/api/chat", async (req, res) => {
    try {
        const { messages } = req.body;

        if (!messages) {
            res.status(400).json({ error: "Messages are required" });
            return;
        }

        // Filter out system messages from the messages array as Anthropic handles them separately
        const userMessages = messages.filter((msg: any) => msg.role !== "system");
        const systemMessage = messages.find((msg: any) => msg.role === "system")?.content ||
            "You are a helpful and enthusiastic AI assistant. You have access to a 'room' tool that can generate rooms. If the user asks to create, generate, or make a room, use the 'room' tool.";

        const tools = functions.map((fn) => ({
            name: fn.name,
            description: fn.description,
            input_schema: fn.parameters,
        }));

        const response = await anthropic.messages.create({
            model: "claude-3-5-sonnet-20241022",
            max_tokens: 1024,
            system: systemMessage,
            messages: userMessages,
            tools: tools as any,
        });

        // Check if the model wanted to call a function
        if (response.stop_reason === "tool_use") {
            const toolUseBlock = response.content.find((block) => block.type === "tool_use");

            if (toolUseBlock && toolUseBlock.type === "tool_use") {
                const functionName = toolUseBlock.name;
                const functionArgs = toolUseBlock.input;
                const toolUseId = toolUseBlock.id;

                const toolFunction = functionMap[functionName as keyof typeof functionMap];

                if (toolFunction) {
                    const functionResult = await toolFunction.handler(functionArgs as any);

                    // Add the assistant's tool use message and the tool result to the conversation
                    const newMessages = [
                        ...userMessages,
                        { role: "assistant", content: response.content },
                        {
                            role: "user",
                            content: [
                                {
                                    type: "tool_result",
                                    tool_use_id: toolUseId,
                                    content: JSON.stringify(functionResult),
                                },
                            ],
                        },
                    ];

                    // Get a new response from the model where it can see the function result
                    const secondResponse = await anthropic.messages.create({
                        model: "claude-3-5-sonnet-20241022",
                        max_tokens: 1024,
                        system: systemMessage,
                        messages: newMessages as any,
                        tools: tools as any,
                    });

                    // Format response to match OpenAI structure for frontend compatibility if needed, 
                    // or just send Anthropic response. 
                    // Assuming frontend expects OpenAI format, we might need to adapt.
                    // But for now, let's send the Anthropic message content.
                    // To keep it simple and likely compatible with a generic chat UI, we'll send the text content.

                    const textContent = secondResponse.content.find(block => block.type === "text");
                    res.json({ role: "assistant", content: textContent?.text || "" });
                }
            }
        } else {
            const textContent = response.content.find(block => block.type === "text");
            res.json({ role: "assistant", content: textContent?.text || "" });
        }

    } catch (error) {
        console.error("Error in chat endpoint:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

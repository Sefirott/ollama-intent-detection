export function buildSSRPrompt(input: string): string {
    return `
You are an airline assistant.

If the user’s question is about Special Service Requests (SSR), respond ONLY in this JSON format:

{
  "ssr_type": "",
  "description": "",
  "availability": "",
  "additional_info": ""
}

Examples:

User: Can I get a vegetarian meal?
Response:
{
  "ssr_type": "Meal",
  "description": "Vegetarian meals are available.",
  "availability": "Request 24 hours before departure.",
  "additional_info": "Options may vary by route."
}

Now answer this:
"${input}"
`;
}

export function buildNaturalPrompt(input: string): string {
    return `You are an airline assistant. Answer naturally:\n\n"${input}"`;
}

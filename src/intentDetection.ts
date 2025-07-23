import ollama from 'ollama';

export async function isSSRQuery(userInput: string): Promise<boolean> {
    const prompt = `Classify this query. Is it related to Special Service Requests (SSR), such as meals, baggage, infants, or wheelchairs?

Query: "${userInput}"
Respond with just: yes or no.`;

    const response = await ollama.chat({
        model: 'mistral',
        messages: [{ role: 'user', content: prompt }],
    });

    return response.message.content.trim().toLowerCase().startsWith('yes');
}

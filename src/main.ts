import ollama from 'ollama';
import { isSSRQuery } from './intentDetection.ts';
import { buildSSRPrompt, buildNaturalPrompt } from './promptBuilder.ts';
import { validateSSRResponse } from './validator.ts';

async function run(query: string) {
    const isSSR = await isSSRQuery(query);
    const prompt = isSSR ? buildSSRPrompt(query) : buildNaturalPrompt(query);

    const response = await ollama.chat({
        model: 'llama3.1:8b',
        messages: [{ role: 'user', content: prompt }],
    });

    const output = response.message.content.trim();

    if (isSSR) {
        try {
            const json = JSON.parse(output);
            if (validateSSRResponse(json)) {
                console.log('✅ Structured SSR Response:\n', json);
            } else {
                console.warn('⚠️ Invalid JSON format:\n', output);
            }
        } catch (err) {
            console.error('❌ Failed to parse JSON:\n', output);
        }
    } else {
        console.log('💬 Natural Response:\n', output);
    }
}

// CLI Usage
const userInput = process.argv.slice(2).join(' ') || 'Can I get a vegan meal?';
run(userInput);

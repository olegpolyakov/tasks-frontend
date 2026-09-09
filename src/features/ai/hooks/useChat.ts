import { useCallback, useState } from 'react';

import { useAuthContext } from '@olegpolyakov/frontend/features/auth';

import type { Message } from '../types';

export default function useChat({ url, prompt }: { url: string; prompt: string }) {
    const { accessToken = '' } = useAuthContext();

    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const sendMessage = useCallback(async (content: string) => {
        const message: Message = {
            role: 'user',
            content
        };

        setMessages(ms => ms.concat(message));
        setLoading(true);
        setError('');

        const data = {
            messages: [
                { role: 'system', content: prompt },
                ...messages,
                message
            ]
        };

        await fetch(`${url}/chat`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            credentials: 'include',
            body: JSON.stringify(data)
        })
            .then(res => handleResponse(res))
            .then(response => {
                setMessages(ms => ms.concat(response));
                setLoading(false);
            }).catch((error: Error) => {
                console.error(error);
            });
    }, [url, prompt, accessToken, messages]);

    return {
        messages,
        isLoading,
        error,
        sendMessage
    };
}

async function handleResponse(res: Response): Promise<Message> {
    const contentType = res.headers.get('Content-Type');

    if (contentType === 'application/json') {
        return await res.json();
    }

    let content = '';
        
    for await (const chunk of streamResponse(res)) {
        try {
            content += JSON.parse(chunk)?.content;
        } catch {
            // noop
        }
    }

    return {
        role: 'assistant',
        content
    };
}

async function* streamResponse(res: Response) {
    const reader = res.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) return;

    while (true) {
        const { value, done } = await reader.read();

        if (done) return;
    
        const chunk = decoder.decode(value, { stream: true });
        const parts = chunk.split('\n');

        for (const part of parts) {
            if (part) yield part;
        }
    }
}
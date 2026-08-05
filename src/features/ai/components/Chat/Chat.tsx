import { KeyboardEvent, useRef, useState } from 'react';

import { Spinner, Text, Textarea } from '@olegpolyakov/ui';
import Markdown from '@olegpolyakov/frontend/components/Markdown';

import { AI_URL } from '@/env';

import styles from './Chat.module.scss';

type Role = 'assistant' | 'system' | 'user';

type Message = {
    role: Role;
    content: string;
};

export default function Chat({
    prompt = ''
}: {
    prompt?: string
}) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const sendMessage = async (content: string) => {
        const message: Message = {
            role: 'user',
            content
        };

        setMessages(ms => ms.concat(message));
        setLoading(true);
        setError('');

        await getResponse([
            { role: 'system', content: prompt },
            ...messages,
            message
        ]).then(response => {
            console.log('RES', response);
            setMessages(ms => ms.concat(response));
            setLoading(false);
        }).catch((error: Error) => {
            console.error(error);
        });
    };

    const handleInput = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter') {
            if (event.shiftKey) return;

            event.preventDefault();

            const content = textareaRef.current?.value;

            if (!content) return;

            textareaRef.current!.value = '';
            sendMessage(content);
        }
    };

    return (
        <div className={styles.root}>
            <div className={styles.messages}>
                {messages.map(message =>
                    <Text
                        key={message.content}
                        as="div"
                        className={`${styles.message} ${styles[message.role]}`}
                    >
                        <Markdown content={message.content} />
                    </Text>
                )}
            </div>

            <div className={styles.input}>
                <Textarea
                    ref={textareaRef}
                    end={isLoading &&
                        <Spinner size="xs" />
                    }
                    onKeyDown={handleInput}
                />

                {error &&
                    <Text
                        content={error}
                        color="danger"
                        size="s"
                    />
                }
            </div>
        </div>
    );
}

async function getResponse(messages: Message[]): Promise<Message> {
    const data = {
        messages
    };

    const res = await fetch(`${AI_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data)
    });
    const contentType = res.headers.get('Content-Type');

    console.log('RES', res.status, res.statusText);

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
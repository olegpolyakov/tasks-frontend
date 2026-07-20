import { KeyboardEvent, useRef, useState } from 'react';

import { Text, Textarea } from '@olegpolyakov/ui';

import { useTaskContext } from '@/features/tasks';

import styles from './Chat.module.scss';

type Role = 'assistant' | 'system' | 'user';

type Message = {
    role: Role;
    content: string;
};

export default function Chat() {
    const { task } = useTaskContext();

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const [prompt, setPrompt] = useState<string>(task ? `Current task ID: ${task.id}` : '');
    const [messages, setMessages] = useState<Message[]>([]);

    const sendMessage = async (content: string) => {
        const message: Message = {
            role: 'user',
            content
        };

        setMessages(ms => ms.concat(message));

        const response = await getResponse([
            { role: 'system', content: prompt },
            ...messages,
            message
        ]);

        setMessages(ms => ms.concat(response));
    };

    const handleInput = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && event.shiftKey) {
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
                        className={`${styles.message} ${styles[message.role]}`}
                        content={message.content}
                    />
                )}
            </div>

            <div className={styles.input}>
                <Textarea
                    ref={textareaRef}
                    onKeyDown={handleInput}
                />
            </div>
        </div>
    );
}

async function getResponse(messages: Message[]): Promise<Message> {
    const data = {
        messages
    };

    const res = await fetch('/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

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
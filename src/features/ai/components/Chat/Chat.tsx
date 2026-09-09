import { KeyboardEvent, useRef } from 'react';

import { Scrollable, Spinner, Text, Textarea } from '@olegpolyakov/ui';
import Markdown from '@olegpolyakov/frontend/components/Markdown';

import useChat from '../../hooks/useChat';

import styles from './Chat.module.scss';

export default function Chat({
    url,
    prompt = ''
}: {
    url: string
    prompt?: string
}) {
    const { messages, isLoading, error, sendMessage } = useChat({ url, prompt });

    const textareaRef = useRef<HTMLTextAreaElement>(null);

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
            <Scrollable fade>
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
            </Scrollable>

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
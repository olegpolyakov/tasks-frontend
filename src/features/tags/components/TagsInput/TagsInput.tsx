import { useRef, useState } from 'react';

import { Button, Field, Flex, Item, List, Pill, Popover } from 'kantanui';
import { v4 as uuid } from 'uuid';

import type { Tag } from '@olegpolyakov/tasks-core';

import EntityIcon from '@/shared/components/EntityIcon';

import { useTagsContext } from '../../contexts';

import styles from './TagsInput.module.scss';

export default function TagsInput({
    tags = [],
    onAdd,
    onRemove,
    onChange
}: {
    tags: Tag[];
    onAdd?: (tag: Partial<Tag>) => void;
    onRemove?: (tag: Tag) => void;
    onChange?: (tags: Partial<Tag>[]) => void;
}) {
    const { tags: allTags } = useTagsContext();

    const [inputValue, setInputValue] = useState('');
    const [isPopoverOpen, setPopoverOpen] = useState(false);
    
    const rootRef = useRef<HTMLDivElement>(null);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && e.currentTarget.value) {
            const newTag = {
                id: uuid(),
                name: e.currentTarget.value
            };
            onAdd?.(newTag);
            onChange?.([...tags, newTag]);
            setInputValue('');
        }
    };

    const handleRemove = (tag: Tag) => {
        onRemove?.(tag);
        onChange?.(tags.filter(t => t.id !== tag.id));
    };

    const handleSelect = (tag: Tag) => {
        console.log('Selected tag:', tag);
        onChange?.([...tags, tag]);
        setInputValue('');
        setPopoverOpen(false);
    };

    const unusedTags = allTags.filter(t => !tags.find(tag => tag.id === t.id));
    const filteredTags = unusedTags.filter(tag => tag.name.toLowerCase().includes(inputValue.toLowerCase()));

    return (
        <div ref={rootRef} className={styles.root}>
            <Field label="Tags">
                <Flex wrap gap="xs">
                    {tags.map(tag => (
                        <Pill
                            key={tag.id}
                            start={
                                <EntityIcon icon={tag.icon || 'tag'} />
                            }
                            content={tag.name}
                            end={
                                <Button
                                    title="Remove tag"
                                    icon="close"
                                    variant="text"
                                    size="xs"
                                    onClick={() => handleRemove(tag)}
                                />
                            }
                        />
                    ))}

                    <input
                        className={styles.input}
                        type="text"
                        value={inputValue}
                        placeholder="Add a tag..."
                        onKeyDown={handleKeyDown}
                        onChange={e => setInputValue(e.target.value)}
                        onFocus={() => setPopoverOpen(true)}
                    />
                </Flex>
            </Field>

            {/* <Select
                placeholder="Add a tag"
                value={tags.map(tag => tag.id)}
                options={tags.map(tag => ({ value: tag.id, content: tag.name }))}
                input
                creatable
            /> */}

            <Popover
                anchorRef={rootRef}
                open={filteredTags.length > 0 && isPopoverOpen}
                onClose={() => setPopoverOpen(false)}
            >
                <List interactive>
                    {filteredTags.map(tag =>
                        <Item
                            key={tag.id}
                            start={
                                <EntityIcon icon={tag.icon || 'tag'} />
                            }
                            content={tag.name}
                            variant="plain"
                            onClick={() => handleSelect(tag)}
                        />
                    )}
                </List>
            </Popover>
        </div>
    );
}
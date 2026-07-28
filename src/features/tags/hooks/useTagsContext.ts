import { useContext } from 'react';

import { TagsContext } from '../contexts';

export default function useTagsContext() {
    const context = useContext(TagsContext);
    
    if (!context) {
        throw new Error('useTagsContext must be used within a TagsProvider');
    }
    
    return context;
}
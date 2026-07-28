import { useContext } from 'react';

import { TagContext } from '../contexts';

export default function useTagContext() {
    const context = useContext(TagContext);
    
    if (!context) {
        throw new Error('useTagContext must be used within a TagProvider');
    }
    
    return context;
}
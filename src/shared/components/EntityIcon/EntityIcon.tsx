import { Icon } from 'kantanui';

import { containsEmoji } from '@/shared/helpers/emoji';

export default function EntityIcon({ icon }: { icon: string }) {
    return containsEmoji(icon)
        ? icon
        : <Icon name={icon} size="inherit" />;
}
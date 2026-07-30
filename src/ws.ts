import { WS_URL } from '@/env';

export const socket = new WebSocket(WS_URL);

socket.onopen = () => console.log('WS connection opened');
socket.onclose = () => console.log('WS connection closed');
socket.onerror = error => console.error('WS error:', error);
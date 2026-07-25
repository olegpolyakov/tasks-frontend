import { APP_DOMAIN } from '@/env';

export const socket = new WebSocket(`ws://${APP_DOMAIN}:8080`);

socket.onopen = () => console.log('WS connection opened');
socket.onclose = () => console.log('WS connection closed');
socket.onerror = error => console.error('WS error:', error);
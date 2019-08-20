import { showMessage, MessageType } from 'react-native-flash-message';

export enum MessageDuration {
  SHORT = 1500,
  MEDIUM = 3000,
  LONG = 5000
}
function show(message: string, level: MessageType, length: MessageDuration = MessageDuration.LONG) {
  showMessage({ message, type: level, duration: length });
}

export const Message = {
  show
};

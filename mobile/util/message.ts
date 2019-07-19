import { showMessage, MessageType } from 'react-native-flash-message';

export enum MessageDuration {
  SHORT = 500,
  MEDIUM = 1000,
  LONG = 2000
}
function show(message: string, level: MessageType, length: MessageDuration) {
  showMessage({ message, type: level, duration: length });
}

export const Message = {
  show
};

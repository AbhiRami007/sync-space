type Message = {
    id: string;
    roomId: string;
    text: string;
    senderId: string;
    createdAt: string;
  };
  
  const messages: Message[] = [];
  
  export const createMessageService = (
    roomId: string,
    text: string,
    senderId: string
  ) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      roomId,
      text,
      senderId,
      createdAt: new Date().toISOString(),
    };
  
    messages.push(newMessage);
  
    return newMessage;
  };
  
  export const getMessagesByRoomService = (roomId: string) => {
    return messages.filter((message) => message.roomId === roomId);
  };
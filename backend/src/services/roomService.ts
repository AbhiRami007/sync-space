type Room = {
    id: string;
    name: string;
    description?: string;
    createdBy: string;
    createdAt: string;
  };
  
  const rooms: Room[] = [];
  
  export const createRoomService = (
    name: string,
    description: string,
    createdBy: string
  ) => {
    const newRoom: Room = {
      id: Date.now().toString(),
      name,
      description,
      createdBy,
      createdAt: new Date().toISOString(),
    };
  
    rooms.push(newRoom);
  
    return newRoom;
  };
  
  export const getAllRoomsService = () => {
    return rooms;
  };
  
  export const getRoomByIdService = (id: string) => {
    return rooms.find((room) => room.id === id) || null;
  };
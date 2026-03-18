import { redisClient } from "../config/redis";

export const addUserToRoomPresence = async (roomId: string, userId: string) => {
  const key = `room:${roomId}:online-users`;
  await redisClient.sAdd(key, userId);
};

export const removeUserFromRoomPresence = async (roomId: string, userId: string) => {
  const key = `room:${roomId}:online-users`;
  await redisClient.sRem(key, userId);
};

export const getOnlineUsersByRoom = async (roomId: string) => {
  const key = `room:${roomId}:online-users`;
  return await redisClient.sMembers(key);
};
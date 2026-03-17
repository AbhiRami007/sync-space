import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

const users: User[] = [];

export const createUser = async (name: string, email: string, password: string) => {
  const existingUser = users.find((user) => user.email === email);

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser: User = {
    id: Date.now().toString(),
    name,
    email,
    password: hashedPassword,
  };

  users.push(newUser);

  return {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
  };
};

export const loginUser = async (email: string, password: string) => {
  const user = users.find((u) => u.email === email);

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
};

export const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  });
};

export const findUserById = (id: string) => {
  const user = users.find((u) => u.id === id);

  if (!user) return null;

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
};
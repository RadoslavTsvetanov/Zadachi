import bcrypt from 'bcrypt';
import { User, addUser, findUserByUsername } from '../models/user';

const saltRounds = 10;

export const registerUser = async (username: string, password: string): Promise<User> => {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const user: User = { id: new Date().valueOf().toString(), username, password: hashedPassword };
  addUser(user);
  return user;
};

export const authenticateUser = async (username: string, password: string): Promise<User | null> => {
  const user = findUserByUsername(username);
  if (user && await bcrypt.compare(password, user.password)) {
    return user;
  }
  return null;
};
import { User } from '../entities/User';

export interface IUserService {
  create(newUser: User): Promise<User>;
  update(id: string, userToUpdate): Promise<User>;
  deleteById(id: string): Promise<User>;
  findById(id: string): Promise<User>;
  fetchAll(): Promise<User[]>;
}

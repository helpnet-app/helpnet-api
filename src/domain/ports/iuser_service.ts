import { UserToCreateDto } from '../dtos/user/UserToCreateDto';
import { UserToUpdateDto } from '../dtos/user/UserToUpdateDto';
import { User } from '../entities/User';

export interface IUserService {
  create(newUser: UserToCreateDto): Promise<User>;
  update(id: string, userToUpdate: UserToUpdateDto): Promise<User>;
  deleteById(id: string): Promise<User>;
  findById(id: string): Promise<User>;
  fetchAll(): Promise<User[]>;
}

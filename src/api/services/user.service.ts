import { User } from 'src/domain/entities/User';
import { IUserService } from 'src/domain/ports/iuser_service';

export class UserService implements IUserService {
  create(newUser: User): Promise<User> {
    throw new Error('Method not implemented.');
  }
  update(id: string, userToUpdate: any): Promise<User> {
    throw new Error('Method not implemented.');
  }
  deleteById(id: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
  findById(id: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
  fetchAll(): Promise<User[]> {
    throw new Error('Method not implemented.');
  }
}

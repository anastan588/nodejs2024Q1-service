import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { User } from 'src/database/database.types';
import { NewUserParametr, UpdateUserParametr } from './dto/user.dto';
import { v4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(private database: DatabaseService) {}

  getAllUsers() {
    return this.database.users;
  }
  getUserByID(id: string): User {
    const user = this.database.users.find((user) => user.id === id);
    return user;
  }

  createUser(createUser: NewUserParametr): User {
    const newUser: User = {
      id: v4(),
      login: createUser.login,
      password: createUser.password,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      version: 1,
    };
    this.database.users.push(newUser);
    return newUser;
  }

  deleteUser(id: string) {
    const userID = this.database.users.findIndex((user) => user.id === id);
    this.database.users.splice(userID, 1);
    return userID;
  }

  updateUserPassword(id: string, updateUser: UpdateUserParametr): User {
    const user = this.database.users.find((user) => user.id === id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    if (user.password !== updateUser.oldPassword) {
      throw new HttpException('Wrong old password', HttpStatus.FORBIDDEN);
    }
    user.version += 1;
    user.updatedAt = new Date().getTime();
    user.password = updateUser.newPassword;
    return user;
  }
}

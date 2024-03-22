import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { User } from 'src/database/database.types';
import { NewUserParametr, UpdateUserParametr } from './dto/user.dto';
import { v4 } from 'uuid';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers() {
    return await this.prisma.user.findMany();
  }
  async getUserByID(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  }

  async createUser(createUser: NewUserParametr): Promise<User> {
    console.log(createUser);
    const newUser: User = {
      id: v4(),
      login: createUser.login.toString(),
      password: createUser.password.toString(),
      createdAt: new Date().getTime().toString(),
      updatedAt: new Date().getTime().toString(),
      version: 1,
    };
    console.log(newUser);
    console.log(createUser);
    const creatUser = await this.prisma.user.create({ data: newUser });
    const id = creatUser.id;
    const users = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    console.log(users);
    return newUser;
  }

  async deleteUser(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    await this.prisma.user.delete({ where: { id: id } });
    return user.id;
  }

  async updateUserPassword(
    id: string,
    updateUser: UpdateUserParametr,
  ): Promise<User> {
    console.log(id);
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    if (user.password !== updateUser.oldPassword) {
      throw new HttpException('Wrong old password', HttpStatus.FORBIDDEN);
    }
    await this.prisma.user.update({
      data: {
        password: updateUser.newPassword,
        version: user.version + 1,
        updatedAt: new Date().getTime().toString(),
      },
      where: { id: id },
    });
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }
}

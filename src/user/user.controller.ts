import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  IDUserParametr,
  NewUserParametr,
  UpdateUserParametr,
} from './dto/user.dto';

@Controller('user')
export class UserController {
  uuidRegex: RegExp;
  constructor(private userService: UserService) {
    this.uuidRegex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  }

  @Get()
  getAllUsers() {
    console.log('get users');
    return this.userService.getAllUsers();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getUserById(@Param() usertoFind: IDUserParametr) {
    console.log('get user By Id');
    console.log(usertoFind.id);
    if (!this.uuidRegex.test(usertoFind.id)) {
      throw new HttpException('User with invalid id', HttpStatus.BAD_REQUEST);
    }
    const user = this.userService.getUserByID(usertoFind.id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createUser(@Body() newUser: NewUserParametr) {
    if (
      Object.keys(newUser).length === 0 ||
      newUser.login === undefined ||
      newUser.password === undefined ||
      newUser.login === null
    ) {
      throw new HttpException('User data invalid', HttpStatus.BAD_REQUEST);
    }
    console.log('create New User');
    const user = this.userService.createUser(newUser);
    const result = JSON.parse(JSON.stringify(user));
    delete result.password;
    return result;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUser(@Param() userToDelete: IDUserParametr) {
    console.log('delete User ById');
    console.log(userToDelete.id);
    if (!this.uuidRegex.test(userToDelete.id)) {
      throw new HttpException('User with invalid id', HttpStatus.BAD_REQUEST);
    }
    const userID = this.userService.deleteUser(userToDelete.id);
    if (userID === -1) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return userID;
  }

  @Put(':id')
  updateUserPassword(
    @Param() userToUpdate: IDUserParametr,
    @Body() updateUserWithNewPassword: UpdateUserParametr,
  ) {
    console.log('update User');
    if (
      Object.keys(updateUserWithNewPassword).length === 0 ||
      updateUserWithNewPassword.newPassword === undefined ||
      updateUserWithNewPassword.oldPassword === undefined
    ) {
      throw new HttpException('New user data invalid', HttpStatus.BAD_REQUEST);
    }
    if (!this.uuidRegex.test(userToUpdate.id)) {
      throw new HttpException('User with invalid id', HttpStatus.BAD_REQUEST);
    }
    const user = this.userService.updateUserPassword(
      userToUpdate.id,
      updateUserWithNewPassword,
    );
    const result = JSON.parse(JSON.stringify(user));
    delete result.password;
    return result;
  }
}

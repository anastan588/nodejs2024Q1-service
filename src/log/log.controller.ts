import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { LoginDto } from 'src/database/database.types';

@Controller('login')
export class LogController {
  @Post()
  @HttpCode(200)
  async login(@Body() loginDto: LoginDto) {
    console.log(loginDto);
    console.log('Login successful');
    const response = {
      token: 'string',
    };
    return response;
  }
}

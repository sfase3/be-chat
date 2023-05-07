import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @Get(':id')
  getUser(@Param() params: { id: string }) {
    return this.usersService.getUserById(params.id);
  }

  @UseGuards(AuthGuard)
  @Get()
  getAllUsers() {
    return this.usersService.getAll();
  }
}

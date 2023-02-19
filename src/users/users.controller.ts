import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  //   @ApiOperation({summary:'Create a user'})
  //   @ApiResponse({status:200,type:User})
  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Post()
  createUser(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @Put()
  updateUser(@Body() dto: UpdateUserDto) {
    return this.usersService.updateUser(dto);
  }

  @Delete()
  deleteUser(@Body() deleteUserDto: DeleteUserDto) {
    return this.usersService.deleteUser(deleteUserDto);
  }
}

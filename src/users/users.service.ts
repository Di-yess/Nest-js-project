import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from './../prisma/prisma.service';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllUsers() {
    try {
      return await this.prisma.user.findMany();
    } catch (err) {
      return err.message;
    }
  }

  async getUser(id: string) {
    try {
      const user = await this.prisma.user.findFirst({
        where: { id: Number(id) },
      });
      if (!user) {
        throw new HttpException('User doesnt exist', HttpStatus.BAD_REQUEST);
      } else {
        return user;
      }
    } catch (err) {
      throw err;
    }
  }

  async createUser(dto: CreateUserDto) {
    const user = await this.prisma.user.create({ data: dto });
    return user;
  }

  async updateUser(dto: UpdateUserDto) {
    const { id, name } = dto;
    const check = await this.prisma.user.findUnique({ where: { id } });
    // if (!check) throw new UnauthorizedException();
    if (!check)
      throw new HttpException(
        'you are not allowed to update',
        HttpStatus.BAD_REQUEST
      );
    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
  }

  async deleteUser(dto: DeleteUserDto) {
    return this.prisma.user.delete({
      where: {
        id: dto.id,
      },
    });
  }
}

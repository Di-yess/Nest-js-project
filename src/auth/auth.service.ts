import {
    HttpException,
    HttpStatus, Injectable, UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { PrismaService } from './../prisma/prisma.service';
import { IUser } from './../types/user.d';
import { UsersService } from './../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
    private usersService: UsersService
  ) {}

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async registration(userDto: CreateUserDto) {
    const check = await this.usersService.getUserByLogin(userDto.login);
    if (check) {
      throw new HttpException(
        'user is already registered',
        HttpStatus.BAD_REQUEST
      );
    }

    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.prisma.user.create({
      data: { ...userDto, password: hashPassword },
    });

    return this.generateToken(user);
  }

  private async generateToken(user: IUser) {
    const { id, login } = user;
    const payload = { id, login };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.usersService.getUserByLogin(userDto.login);
    const checkPassword = await bcrypt.compare(userDto.password, user.password);

    if (user && checkPassword) {
      return user;
    }

    throw new UnauthorizedException({
      message: 'Некорректный email или пароль',
    });
  }
}

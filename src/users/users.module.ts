import { AuthModule } from './../auth/auth.module';
import { PostsModule } from './../posts/posts.module';
import { PrismaService } from './../prisma/prisma.service';
import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
  imports: [PostsModule, forwardRef(() => AuthModule)],
  exports: [UsersService],
})
export class UsersModule {}

import { PrismaService } from './../prisma/prisma.service';
import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';

@Module({
  providers: [PostsService, PrismaService],
  controllers: [PostsController],
  exports: [PostsService],
})
export class PostsModule {}

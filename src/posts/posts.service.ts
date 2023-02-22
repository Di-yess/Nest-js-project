import { CreatePostDto } from './dto/create-post.dto';
import { PrismaService } from './../prisma/prisma.service';
import { HttpException, HttpStatus, Injectable, Res } from '@nestjs/common';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllPosts() {
    try {
      await this.prisma.post.findMany();
    } catch (err) {
      throw err;
    }
  }

  async getPostById(id: string) {
    try {
      const post = await this.prisma.post.findFirst({
        where: { id: Number(id) },
      });
      if (!post) {
        throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
      } else {
        return post;
      }
    } catch (err) {
      throw err;
    }
  }

  async createPost(post: CreatePostDto) {
    try {
      await this.prisma.post.create({ data: { ...post, userId: 7 } });
      return 'post created successfully';
    } catch (err) {
      throw err;
    }
  }

  async deletePost(id: string) {
    try {
      await this.prisma.post.delete({ where: { id: Number(id) } });
      return 'post deleted successfully';
    } catch (err) {
      throw err;
    }
  }
}

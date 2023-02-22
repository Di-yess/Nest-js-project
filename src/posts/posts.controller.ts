import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { Controller, Get, Param, Body, Post, Delete } from '@nestjs/common';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  getAllPosts() {
    return this.postsService.getAllPosts();
  }

  @Get(':id')
  getPostById(@Param('id') id: string) {
    return this.postsService.getPostById(id);
  }

  @Post()
  createPost(@Body() postDto: CreatePostDto) {
    return this.postsService.createPost(postDto);
  }

  @Delete(':id')
  deletePost(@Param('id') id: string) {
    return this.postsService.deletePost(id);
  }
}

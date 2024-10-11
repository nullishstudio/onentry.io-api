import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { User } from '@prisma/client';
import { AddUserDto, UpdateUserDto } from './dto/user.dto';

@Controller('api/user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private user: UserService) {}

  @Post()
  async addUserBasicProfile(
    @GetUser() { id }: User,
    @Body() addBasicInfo: AddUserDto,
  ) {
    return await this.user.addUserBasicProfile(id, addBasicInfo);
  }

  @Get()
  async getUserBasicProfile(@GetUser() { id }: User) {
    return await this.user.getUserBasicProfile(id);
  }

  @Patch()
  async updateUserBasicProfile(
    @GetUser() { id }: User,
    @Body() updateDto: UpdateUserDto,
  ) {
    return await this.user.updateUserBasicProfile(id, updateDto);
  }
}

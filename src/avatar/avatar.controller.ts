import {
  Body,
  Controller,
  Get,
  HttpException,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AvatarService } from './avatar.service';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { BaseAvatarUrl, UpdateAvatarDto } from './dto/avatar.dto';
import { User } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('api/avatar')
@UseGuards(AuthGuard('jwt'))
export class AvatarController {
  constructor(
    private avatar: AvatarService,
    private cloudinary: CloudinaryService,
  ) {}

  @Get()
  async getAllAvatars(@GetUser() { id }: User) {
    return await this.avatar.getAllAvatars(id);
  }

  @Patch('save')
  async setAvatar(
    @GetUser() { id }: User,
    @Body() { avatarId }: UpdateAvatarDto,
  ) {
    return await this.avatar.setAvatar(id, avatarId);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(
    @GetUser() { id }: User,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      const res = await this.cloudinary.uploadFile(file);
      return await this.avatar.uploadAvatar(id, res?.secure_url);
    } catch (error) {
      throw new HttpException('Unable to upload image', error);
    }
  }

  @Post('base')
  async saveBaseAvatar(
    @GetUser() { id }: User,
    @Body() baseAvatarUrl: BaseAvatarUrl,
  ) {
    return await this.avatar.saveBaseAvatar(id, baseAvatarUrl);
  }
}

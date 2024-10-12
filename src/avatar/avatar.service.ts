import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BaseAvatarUrl } from './dto/avatar.dto';

@Injectable()
export class AvatarService {
  constructor(private prisma: PrismaService) {}

  async getAllAvatars(userId: string) {
    return await this.prisma.avatar.findMany({
      where: {
        userId,
      },
    });
  }

  async setAvatar(id: string, avatarId: string) {
    const avatar = await this.prisma.avatar.findUnique({
      where: {
        id: avatarId,
      },
    });
    return await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        avatarUrl: avatar.avatarUrl,
      },
    });
  }

  async uploadAvatar(id: string, secure_url: string) {
    const userAvatar = await this.prisma.avatar.create({
      data: {
        avatarUrl: secure_url,
        userId: id,
      },
    });

    return {
      data: { ...userAvatar },
      statusCode: HttpStatus.CREATED,
      message: 'Avatar uploaded succesfully',
    };
  }

  async saveBaseAvatar(id: string, { baseAvatarUrl }: BaseAvatarUrl) {
    const userAvatar = await this.prisma.avatar.create({
      data: {
        avatarUrl: baseAvatarUrl,
        userId: id,
      },
    });

    return {
      data: { ...userAvatar },
      statusCode: HttpStatus.CREATED,
      message: 'Avatar uploaded succesfully',
    };
  }
}

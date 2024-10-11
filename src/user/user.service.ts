import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { AddUserDto, UpdateUserDto } from './dto/user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async addUserBasicProfile(id: string, addBasicInfo: AddUserDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id,
        },
      });

      if (!user) throw new NotFoundException('Creator not found');

      await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          ...addBasicInfo,
        },
      });

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Creator profile updated successfully',
      };
    } catch (error) {
      throw error;
    }
  }

  async getUserBasicProfile(id: string) {
    return await this.prisma.user.findUnique({
      where: { id },
      include: {
        avatar: true,
        extraLinks: true,
        social: true,
      },
    });
  }

  async updateUserBasicProfile(id: string, updateDto: UpdateUserDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id,
        },
      });

      if (!user) throw new NotFoundException('Creator not found');

      await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          ...updateDto,
        },
      });

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Creator profile updated successfully',
      };
    } catch (error) {
      throw error;
    }
  }
}

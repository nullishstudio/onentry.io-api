import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PublicProfileService {
  constructor(private prisma: PrismaService) {}

  async getPublicProfile(username: string) {
    return await this.prisma.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
        avatarUrl: true,
        bio: true,
        fullname: true,
        username: true,
        wallet_address: true,
        avatar: {
          select: {
            id: true,
            avatarUrl: true,
          },
        },
        extraLinks: {
          select: {
            id: true,
            title: true,
            description: true,
          },
        },
        social: true,
        email: true,
        url: true,
        github: true,
        twitter: true,
        telegram: true,
        farcaster: true,
        lens: true,
        discord: true,
        phone: true,
        createdAt: true,
        updatedAt: true,
        contact: {
          select: {
            id: true,
            label: true,
            value: true,
          },
        },
      },
    });
  }
}

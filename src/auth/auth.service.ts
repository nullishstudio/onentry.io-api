import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async createNewAccount(wallet_address: string) {
    try {
      const newUser = await this.prisma.user.create({
        data: {
          wallet_address,
          fullname: '',
          username: '',
        },
      });

      const token = await this.jwt.signAsync(
        {
          wallet_address,
          id: newUser?.id,
        },
        {
          expiresIn: '72h',
          secret: this.config.get('JWT_SECRET'),
        },
      );

      return {
        data: {
          ...newUser,
          token,
        },
        message: 'Creator created successfully',
      };
    } catch (error) {
      throw error;
    }
  }

  async verifyWalletAddress(wallet_address: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        wallet_address,
      },
    });

    if (!user) {
      return {
        message: 'Builder with wallet address not found',
        statusCode: HttpStatus.NOT_FOUND,
      };
    }

    return {
      message: 'Builder with wallet address found',
      statusCode: HttpStatus.FOUND,
    };
  }
}

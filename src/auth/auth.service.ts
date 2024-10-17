import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async loginWithWallet(wallet_address: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        wallet_address,
      },
      include: {
        avatar: true,
        extraLinks: true,
        social: true,
      },
    });
    const token = await this.jwt.signAsync(
      {
        wallet_address,
        id: user?.id,
      },
      {
        expiresIn: '96h',
        secret: this.config.get('JWT_SECRET'),
      },
    );

    return {
      data: {
        ...user,
        token,
      },
      message: 'Login was successful',
    };
  }

  async createNewAccount(wallet_address: string) {
    const tempUsername = `user_${wallet_address.substring(0, 8)}`;
    try {
      const newUser = await this.prisma.user.create({
        data: {
          wallet_address,
          fullname: '',
          username: tempUsername,
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
      let errorMsg = '';
      if (error instanceof PrismaClientKnownRequestError)
        errorMsg = 'Account already exist';
      throw new HttpException(errorMsg, HttpStatus.EXPECTATION_FAILED);
    }
  }

  async verifyWalletAddress(wallet_address: string) {
    const user = await this.prisma.user.findFirst({
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

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('wallet')
  async createNewAccount(
    @Body() { wallet_address }: { wallet_address: string },
  ) {
    return await this.authService.createNewAccount(wallet_address);
  }

  @Post('wallet/login')
  async loginWithWallet(
    @Body() { wallet_address }: { wallet_address: string },
  ) {
    return await this.authService.loginWithWallet(wallet_address);
  }

  @Get('wallet/verify/:wallet_address')
  async verifyWalletAddress(@Param('wallet_address') wallet_address: string) {
    return await this.authService.verifyWalletAddress(wallet_address);
  }
}

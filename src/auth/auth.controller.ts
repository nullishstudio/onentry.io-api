import { Body, Controller, Get, Post } from '@nestjs/common';
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

  @Get('wallet/verify')
  async verifyWalletAddress(
    @Body() { wallet_address }: { wallet_address: string },
  ) {
    return await this.authService.verifyWalletAddress(wallet_address);
  }
}

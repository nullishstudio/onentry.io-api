import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { CreatePortfolio, UpdatePortfolio } from './dto/portfolio.dto';
import { User } from '@prisma/client';

@Controller('api/portfolio')
@UseGuards(AuthGuard('jwt'))
export class PortfolioController {
  constructor(private portfolio: PortfolioService) {}

  @Post()
  async createPortfolio(
    @GetUser() { id }: User,
    @Body() portfolioDto: CreatePortfolio,
  ) {
    return await this.portfolio.createPortfolio(id, portfolioDto);
  }

  @Get()
  async getPortfolio(@GetUser() { id }: User) {
    return await this.portfolio.getPortfolio(id);
  }

  @Get(':portfolioId')
  async getSinglePortfolio(@Param('portfolioId') portfolioId: string) {
    return await this.portfolio.getSinglePortfolio(portfolioId);
  }

  @Patch()
  async updatePortfolio(
    @Param('portfolioId') portfolioId: string,
    @Body()
    portfolioDto: UpdatePortfolio,
  ) {
    return await this.portfolio.updatePortfolio(portfolioId, portfolioDto);
  }

  @Delete(':portfolioId')
  async deletePortfolio(@Param('portfolioId') portfolioId: string) {
    return await this.portfolio.deletePortfolio(portfolioId);
  }
}

import { CreatePortfolio, UpdatePortfolio } from './dto/portfolio.dto';
import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PortfolioService {
  constructor(private prisma: PrismaService) {}

  async createPortfolio(id: string, portfolioDto: CreatePortfolio) {
    const portfolio = await this.prisma.extraLinks.create({
      data: {
        ...portfolioDto,
        userId: id,
      },
    });

    return {
      data: {
        ...portfolio,
      },
      message: 'Portfolio created successfully',
      statusCode: HttpStatus.CREATED,
    };
  }

  async getPortfolio(id: string) {
    return await this.prisma.extraLinks.findMany({
      where: {
        userId: id,
      },
    });
  }

  async getSinglePortfolio(id: string) {
    return await this.prisma.extraLinks.findUnique({
      where: {
        id,
      },
    });
  }

  async updatePortfolio(id: string, updateDto: UpdatePortfolio) {
    return await this.prisma.extraLinks.update({
      where: {
        id,
      },
      data: {
        ...updateDto,
      },
    });
  }

  async deletePortfolio(id: string) {
    await this.prisma.extraLinks.delete({
      where: {
        id,
      },
    });
  }
}

import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreatePortfolio {
  @IsNotEmpty()
  @IsUrl()
  url: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}

export class UpdatePortfolio {
  @IsOptional()
  @IsUrl()
  url?: string;

  @IsOptional()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;
}

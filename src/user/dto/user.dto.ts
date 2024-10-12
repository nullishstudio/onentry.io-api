import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AddUserDto {
  @IsString()
  @IsNotEmpty()
  fullname: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  bio: string;
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  fullname?: string;

  @IsString()
  @IsOptional()
  username?: string;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  url?: string;

  @IsString()
  @IsOptional()
  github?: string;

  @IsString()
  @IsOptional()
  twitter?: string;

  @IsString()
  @IsOptional()
  farcaster?: string;

  @IsString()
  @IsOptional()
  lens?: string;

  @IsString()
  @IsOptional()
  telegram?: string;

  @IsString()
  @IsOptional()
  discord?: string;

  @IsString()
  @IsOptional()
  avatarUrl?: string;
}

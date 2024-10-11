import { IsOptional, IsString } from 'class-validator';

export class UpdateAvatarDto {
  @IsString()
  @IsOptional()
  avatarId?: string;
}

import { IsNotEmpty, IsString } from 'class-validator';

export class PublicProfileDto {
  @IsString()
  @IsNotEmpty()
  username: string;
}

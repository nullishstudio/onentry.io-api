import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateContactDto {
  @IsString()
  @IsNotEmpty()
  label: string;

  @IsString()
  @IsNotEmpty()
  value: string;
}

export class UpdateContactDto {
  @IsString()
  @IsOptional()
  label: string;

  @IsString()
  @IsOptional()
  value: string;
}

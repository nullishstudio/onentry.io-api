import { Controller, Get, Param } from '@nestjs/common';
import { PublicProfileService } from './public-profile.service';

@Controller('api/public-profile')
export class PublicProfileController {
  constructor(private publicprofile: PublicProfileService) {}

  @Get(':username')
  async getPublicProfile(@Param('username') username: string) {
    return await this.publicprofile.getPublicProfile(username);
  }
}

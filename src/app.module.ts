import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { AvatarModule } from './avatar/avatar.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, AuthModule, UserModule, CloudinaryModule, AvatarModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

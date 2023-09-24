import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [ConfigService],
  controllers: [UploadController],
})
export class UploadModule {}

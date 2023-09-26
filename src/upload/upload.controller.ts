import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import dayjs = require('dayjs');
import { diskStorage } from 'multer';

@Controller('upload')
export class UploadController {
  constructor(private configService: ConfigService) {}

  @Post('/image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads', // Thư mục lưu trữ tệp
        filename: (req, file, cb) => {
          const uniqueSuffix = dayjs().format() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${uniqueSuffix}.${file.originalname.replace(/\s/g, '')}`);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file) {
    try {
      return {
        statusCode: 200,
        message: 'Success',
        payload: {
          url: `${this.configService.get('UPLOAD_FILE_URL')}/${file.path}`,
        },
      };
    } catch (error) {
      throw error;
    }
  }
}

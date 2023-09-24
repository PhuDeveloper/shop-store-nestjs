import { extname, join } from 'path';
import * as fs from 'fs';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { HttpStatus } from '@nestjs/common';
// import CustomException from '@lib/utils/custom.exception';

const MAX_FILE_SIZE = 10000000;

// Multer configuration
export const multerConfig = {
  dest: 'upload',
};

const mimeTypes = [
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // xlsx
  'application/pdf', // pdf
  'application/msword', // doc
  'image/jpg',
  'image/jpeg',
  'image/png',
  'image/gif',
  'pdf',
];

// Multer upload options
export const multerOptions = {
  // Enable file size limits
  limits: {
    fileSize: +MAX_FILE_SIZE,
  },
  // Check the mimetypes to allow for upload
  //   fileFilter: (req: any, file: any, cb: any) => {
  //     const validMimeTypes = new RegExp(`^(${mimeTypes.map((type) => type.replace('/', '\\/')).join('|')})$`);
  //     if (validMimeTypes.test(file.mimetype)) {
  //       cb(null, true);
  //     } else {
  //       cb(new CustomException('ERROR', `Unsupported file type ${extname(file.originalname)}`, HttpStatus.BAD_REQUEST));
  //     }
  //   },
  // Storage properties
  storage: diskStorage({
    // Destination storage path details
    destination: (req: any, file: any, cb: any) => {
      const uploadPath = multerConfig.dest;
      const currentDate = new Date();

      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const day = currentDate.getDate();

      const fullUploadPath = join(uploadPath, String(year), String(month), String(day));
      // Create folder if doesn't exist
      if (!fs.existsSync(fullUploadPath)) {
        fs.mkdirSync(fullUploadPath, { recursive: true });
      }
      cb(null, fullUploadPath);
    },
    filename: (req: any, file: any, cb: any) => {
      cb(null, `${uuid()}${extname(file.originalname)}`);
    },
  }),
};

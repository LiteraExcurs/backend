import { Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { MFile } from './mfile.class';
import { FileElementResponse } from './dto/response-element.dto';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
import * as sharp from 'sharp';

@Injectable()
export class FilesService {
  create(createFileDto: CreateFileDto) {
    return 'This action adds a new file';
  }

  async saveFile(files: MFile[]): Promise<FileElementResponse[]> {
    const uploadFolder = `${path}`;
    await ensureDir(uploadFolder);
    const res: FileElementResponse[] = [];
    for (const file of files) {
      await writeFile(`${uploadFolder}/uploads/${file.originalname}`, file.buffer);
      res.push({
        url: `/uploads/${file.originalname}`,
        name: file.originalname,
      });
    }
    return res;
  }

  convertToWepP(file: Buffer): Promise<Buffer> {
    return sharp(file)
    .webp({ lossless: true })
    .toBuffer();
  }

}

import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { MFile } from './mfile.class';
import { FileElementResponse } from './dto/response-element.dto';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
import * as sharp from 'sharp';
import { File } from './entities/file.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private createFileDto: Repository<File>,
  ) { }


  async saveFile(files: MFile[]): Promise<FileElementResponse[]> {
    const uploadFolder = `${path}`;
    await ensureDir(uploadFolder);
    const res: FileElementResponse[] = [];
    for (const file of files) {
      await writeFile(
        `${uploadFolder}/uploads/${file.originalname}`,
        file.buffer,
      );
      res.push({
        url: `/uploads/${file.originalname}`,
        name: file.originalname,
      });
      this.createRecord({
        name: file.originalname,
        type: file.originalname,
        url: `/uploads/${file.originalname}`,

      })
    }
    return res;
  }

  async convertToWepP(file: Buffer): Promise<Buffer> {
    return sharp(file).webp({ lossless: true }).toBuffer();
  }

  async createRecord(query: CreateFileDto): Promise<File> {
    const newFile = await this.createFileDto.save(query);
    return newFile;
  }
}

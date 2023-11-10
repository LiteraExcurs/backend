import { Injectable } from '@nestjs/common';
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
    private filesRepository: Repository<File>,
  ) {}

  async convertToWepP(file: Buffer): Promise<Buffer> {
    return sharp(file).webp({ lossless: true }).toBuffer();
  }

  async saveFile(
    files: MFile[],
    entitiType: string,
  ): Promise<FileElementResponse[]> {
    const uploadFolder = `${path}`;
    await ensureDir(uploadFolder);
    const res: FileElementResponse[] = [];

    for (const file of files) {
      const webpFile = await this.convertToWepP(file.buffer);
      try {
        await writeFile(
          `${uploadFolder}/uploads/${entitiType}/${file.originalname}`,
          webpFile,
        );
        res.push({
          url: `/static/${entitiType}/${file.originalname}`,
          name: file.originalname,
        });
      } catch (err) {
        throw new Error(err);
      }

      await this.createRecord({
        name: file.originalname,
        type: entitiType,
        slug: file.originalname,
        url: `/static/${entitiType}/${file.originalname}`,
      });
    }
    return res;
  }

  async createRecord(query: CreateFileDto): Promise<File> {
    return await this.filesRepository.save(query);
  }
  async getAllFiles(): Promise<File[]> {
    return await this.filesRepository.find();
  }
}

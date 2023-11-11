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
import { randomId } from './files.utils';

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
    entityType: string,
  ): Promise<FileElementResponse[]> {
    const uploadFolder = `${path}`;
    await ensureDir(uploadFolder);
    const res: FileElementResponse[] = [];

    // Генерируем имя случайным образом
    const randomName = randomId();

    for (const file of files) {
      const webpFile = await this.convertToWepP(file.buffer);
      try {
        await writeFile(
          `${uploadFolder}/uploads/${entityType}/${randomName}.webp`,
          webpFile,
        );
        res.push({
          url: `/static/${entityType}/${randomName}.webp`,
          name: `${randomName}.webp`,
        });
      } catch (err) {
        throw new Error(err);
      }

      //Создаем запить в базе, сохранив изначальное имя файла
      await this.createRecord({
        name: file.originalname,
        type: entityType,
        slug: randomName,
        url: `/static/${entityType}/${randomName}`,
      });
    }
    return res;
  }

  async createRecord(data: CreateFileDto): Promise<File> {
    return await this.filesRepository.save(data);
  }
  async getAllFiles(): Promise<File[]> {
    return await this.filesRepository.find();
  }
}

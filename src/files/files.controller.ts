import {
  Controller,
  FileTypeValidator,
  Get,
  HttpCode,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileElementResponse } from './dto/response-element.dto';
import { MFile } from './mfile.class';
import { ApiTags } from '@nestjs/swagger';
import { filesDirectory } from './files.constants';

@Controller('files')
@ApiTags('Files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}
  @Post('upload-activity')
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('files'))
  async uploadedActivityFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<FileElementResponse[]> {
    const saveArray: MFile[] = [];
    new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({ maxSize: 1000 }),
        new FileTypeValidator({ fileType: 'image/jpeg' }),
      ],
    });
    saveArray.push(
      new MFile({
        originalname: `${file.originalname.split('.')[0]}.webp`,
        buffer: file.buffer,
      }),
    );
    return this.filesService.saveFile(saveArray, filesDirectory.activities);
  }

  @Post('upload-guide')
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('files'))
  async uploadGuidFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<FileElementResponse[]> {
    const saveArray: MFile[] = [];

    new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({ maxSize: 1000 }),
        new FileTypeValidator({ fileType: 'image/jpeg' }),
      ],
    });
    saveArray.push(
      new MFile({
        originalname: `${file.originalname.split('.')[0]}.webp`,
        buffer: file.buffer,
      }),
    );
    return this.filesService.saveFile(saveArray, 'guides');
  }
  @Get()
  getFiles() {
    return this.filesService.getAllFiles();
  }
}

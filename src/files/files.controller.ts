import {
  Controller,
  HttpCode,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileElementResponse } from './dto/response-element.dto';
import { MFile } from './mfile.class';
import { ApiParam, ApiProperty, ApiTags } from '@nestjs/swagger';

@Controller('files')
@ApiTags('Files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}
  @Post('upload')
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('files'))
  async uploadedFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<FileElementResponse[]> {
    const saveArray: MFile[] = [new MFile(file)];
    const buffer = await this.filesService.convertToWepP(file.buffer);
    saveArray.push(
      new MFile({
        originalname: `${file.originalname.split('.')[0]}.webp`,
        buffer,
      }),
    );
    return this.filesService.saveFile(saveArray);
  }
}

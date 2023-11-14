import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateGuideDto } from './dto/create-guide.dto';
import { UpdateGuideDto } from './dto/update-guide.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Guide } from './entities/guide.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GuidesService {
  constructor(
    @InjectRepository(Guide)
    private guidessRepository: Repository<Guide>,
  ) {}
  async create(query: CreateGuideDto) {
    const { name } = query;
    const guide = await this.guidessRepository.findOne({
      where: { name },
    });
    if (guide) {
      throw new BadRequestException('Гид с таким именем уже есть');
    }
    const newGuide = await this.guidessRepository.save(query);
    return newGuide;
  }

  async findAll() {
    return await this.guidessRepository.find({
      select: {
        id: true,
        name: true,
        description: true,
        image: true,
        isActive: true,
      },
    });
  }

  async update(id: number, query: UpdateGuideDto) {
    const guide = await this.guidessRepository.findOne({
      where: { id },
    });
    if (guide) {
      const { id } = guide;
      await this.guidessRepository.update(id, query);
      return `Гид ${guide.name} обновлена успешно`;
    }
    throw new NotFoundException('Гид с таким именем уже есть');
  }

  async remove(id: number) {
    const guide = await this.guidessRepository.findOne({
      where: { id },
    });
    if (guide) {
      const { id } = guide;
      await this.guidessRepository.delete(id);
      return `Гид ${guide.name} удален успешно`;
    }
    throw new NotFoundException('Гида с таким именем не существует');
  }
}

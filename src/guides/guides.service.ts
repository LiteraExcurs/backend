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
    private guidesRepository: Repository<Guide>,
  ) {}
  async create(query: CreateGuideDto) {
    const { name } = query;
    const guide = await this.guidesRepository.findOne({
      where: { name },
    });
    if (!guide) {
      const newGuide = this.guidesRepository.create({
        ...query,
        events: [],
      });
      return await this.guidesRepository.save(newGuide);
    }
    throw new BadRequestException('Гид с таким именем уже есть');
  }

  async findAll() {
    return await this.guidesRepository.find({
      select: {
        id: true,
        name: true,
        description: true,
        image: true,
        isActive: true,
      },
    });
  }
  async findById(id: number) {
    const guide = await this.guidesRepository.findOne({
      where: { id },
    });
    if (!guide) {
      throw new NotFoundException('Гида с таким именем не существует');
    }
    return guide;
  }
  async update(id: number, query: UpdateGuideDto) {
    const guide = await this.guidesRepository.findOne({
      where: { id },
    });
    if (!guide) {
      throw new NotFoundException('Гида с таким именем не существует');
    }
    await this.guidesRepository.update(id, query);
    return `Гид ${guide.name} обновлена успешно`;
  }

  async remove(id: number) {
    const guide = await this.guidesRepository.findOne({
      where: { id },
    });
    if (!guide) {
      throw new NotFoundException('Гида с таким именем не существует');
    }
    await this.guidesRepository.delete(id);
    return `Гид ${guide.name} удален успешно`;
  }
}

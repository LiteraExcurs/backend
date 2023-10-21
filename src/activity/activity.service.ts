import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity } from './entities/activity.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private activitesRepository: Repository<Activity>,
  ) {}

  async create(query: CreateActivityDto) {
    const { slug } = query;
    const activity = await this.activitesRepository.findOne({
      where: { slug },
    });
    if (activity) {
      throw new BadRequestException('Такая активность уже есть');
    }
    const newActivity = await this.activitesRepository.save(query);
    return newActivity;
  }

  async findAll() {
    return await this.activitesRepository.find({
      select: {
        id: true,
        name: true,
        image: true,
        slug: true,
        isActive: true,
        location: true,
        type: true,
      },
    });
  }

  async findOne(slug: string) {
    const activity = await this.activitesRepository.findOne({
      where: { slug },
    });
    if (activity) {
      return activity;
    }
    throw new NotFoundException('Такое мероприятие не найдено');
  }

  async update(slug: string, updateActivityDto: UpdateActivityDto) {
    const activity = await this.activitesRepository.findOne({
      where: { slug },
    });
    if (activity) {
      const { id } = activity;
      await this.activitesRepository.update(id, updateActivityDto);
      return `Активность ${activity.name} обновлена успешно`;
    }
    throw new NotFoundException('Такое мероприятие не найдено');
  }

  async remove(slug: string) {
    const activity = await this.activitesRepository.findOne({
      where: { slug },
    });
    if (activity) {
      const { id } = activity;
      await this.activitesRepository.delete(id);
      return `Активность ${activity.name} удалена успешно`;
    }
    throw new NotFoundException('Такое мероприятие не найдено');
  }
}

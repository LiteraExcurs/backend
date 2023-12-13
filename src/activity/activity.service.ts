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
    private activitiesRepository: Repository<Activity>,
  ) {}

  async create(query: CreateActivityDto) {
    const { slug } = query;
    const activity = await this.activitiesRepository.findOne({
      where: { slug },
    });
    if (activity) {
      throw new BadRequestException('Такая активность уже есть');
    }
    return await this.activitiesRepository.save(query);
  }

  async findAll() {
    return await this.activitiesRepository.find({
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

  async findById(id: number) {
    const activity = await this.activitiesRepository.findOne({
      where: { id },
      relations: {
        events: true,
      },
    });
    if (!activity) {
      throw new NotFoundException(`Активность с таким id не найдена`);
    }
    return activity;
  }

  async findOne(slug: string) {
    const activity = await this.activitiesRepository.findOne({
      where: { slug },
    });
    if (activity) {
      return activity;
    }
    throw new NotFoundException('Такое мероприятие не найдено');
  }

  async update(slug: string, updateActivityDto: UpdateActivityDto) {
    const activity = await this.activitiesRepository.findOne({
      where: { slug },
    });
    if (activity) {
      const { id } = activity;
      await this.activitiesRepository.update(id, updateActivityDto);
      return `Активность ${activity.name} обновлена успешно`;
    }
    throw new NotFoundException('Такое мероприятие не найдено');
  }

  async remove(slug: string) {
    const activity = await this.activitiesRepository.findOne({
      where: { slug },
    });
    if (activity) {
      const { id } = activity;
      await this.activitiesRepository.delete(id);
      return `Активность ${activity.name} удалена успешно`;
    }
    throw new NotFoundException('Такое мероприятие не найдено');
  }
}

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity } from './entities/activity.entity';
import { FindManyOptions, IsNull, Not, Repository } from 'typeorm';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private activitesRepository: Repository<Activity>,
  ) {}

  async create(query: CreateActivityDto) {
    const { routName } = query;
    const activity = await this.activitesRepository.findOne({
      where: { routName },
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
        routName: true,
      },
    });
  }

  async findOne(routName: string) {
    const activity = await this.activitesRepository.findOne({
      where: { routName },
    });
    if (activity) {
      return activity;
    }
    throw new NotFoundException('Такое мероприятие не найдено');
  }

  async update(routName: string, updateActivityDto: UpdateActivityDto) {
    const activity = await this.activitesRepository.findOne({
      where: { routName },
    });
    if (activity) {
      const { id } = activity;
      await this.activitesRepository.update(id, updateActivityDto);
      return `Активность ${activity.name} обновлена успешно`;
    }
    throw new NotFoundException('Такое мероприятие не найдено');
  }

  async remove(routName: string) {
    const activity = await this.activitesRepository.findOne({
      where: { routName },
    });
    if (activity) {
      const { id } = activity;
      await this.activitesRepository.delete(id);
      return `Активность ${activity.name} удалена успешно`;
    }
    throw new NotFoundException('Такое мероприятие не найдено');
  }
}

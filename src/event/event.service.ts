import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { ActivityService } from '../activity/activity.service';
import { GuidesService } from '../guides/guides.service';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,
    private activityService: ActivityService,
    private guidesService: GuidesService,
  ) {}
  async create(query: CreateEventDto) {
    const { activityId, guideId } = query;
    //Находим активность
    const activity = await this.activityService.findById(activityId);
    //Находим гида
    const guide = await this.guidesService.findById(guideId);

    const { name, slug, description, subtitle } = activity;

    const newEvent = this.eventsRepository.create({
      ...query,
      name: name,
      slug: slug,
      description: description,
      subtitle: subtitle,
      activity: activity,
      guide: guide,
      booked: [],
    });
    return await this.eventsRepository.save(newEvent);
  }
  async findAll() {
    return await this.eventsRepository.find({
      relations: {
        booked: true,
        guide: true,
      },
    });
  }
  async findById(id: number) {
    const event = await this.eventsRepository.findOne({
      where: { id },
      relations: {
        booked: true,
      },
    });
    if (!event) {
      throw new NotFoundException('Такое мероприятие не найдено');
    }
    return event;
  }

  async update(slug: string, updateEventDto: UpdateEventDto) {
    const event = await this.eventsRepository.findOne({
      where: { slug },
    });
    if (!event) {
      throw new NotFoundException('Такое мероприятие не найдено');
    }
    const { id } = event;
    await this.eventsRepository.update(id, updateEventDto);
    return `Активность ${event.name} обновлена успешно`;
  }

  async remove(slug: string) {
    const event = await this.eventsRepository.findOne({
      where: { slug },
    });
    if (!event) {
      throw new NotFoundException('Такое мероприятие не найдено');
    }
    const { id } = event;
    await this.eventsRepository.delete(id);
    return `Событие ${event.name} удалена успешно`;
  }
}

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,
  ) {}
  async create(query: CreateEventDto) {
    const { name } = query;
    const event = await this.eventsRepository.findOne({
      where: { name },
    });

    if (!event) {
      // перед тем, как добавлять активность, нужно найти гида
      // еще одна бага - если slug не уникальный, то возникает ошибка
      // которую нигде не отлавливают
      return await this.eventsRepository.save(query);
    }

    throw new BadRequestException('Событие с таким названием уже существует.');
  }

  async findAll() {
    return await this.eventsRepository.find({
      select: {
        id: true,
        name: true,
        slug: true,
        isActive: true,
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

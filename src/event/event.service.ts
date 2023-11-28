import { BadRequestException, Injectable } from '@nestjs/common';
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
    const guide = await this.eventsRepository.findOne({
      where: { name },
    });
    if (!guide) {
      return await this.eventsRepository.save(query);
    }
    throw new BadRequestException('Гид с таким именем уже есть');
  }
  findAll() {
    return `This action returns all event`;
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}

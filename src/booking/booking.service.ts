import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { EventService } from '../event/event.service';
import { BookingQuery } from './types/booking.types';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
    private eventService: EventService,
  ) {}
  async create(query: BookingQuery) {
    const event = await this.eventService.findById(query.activityId);
    console.log(event);
    await this.bookingRepository.save({
      ...query,
      activity: event,
      price: event,
    });
    const { name } = event;
    return `Вы успешно записались на экскурсию ${name}`;
  }
  async findAll() {
    return await this.bookingRepository.find({
      select: {
        id: true,
        email: true,
        name: true,
        visitors: true,
        phoneNumber: true,
      },
    });
  }
  async findOne(id: number) {
    const event = await this.bookingRepository.findOne({
      where: { id },
    });
    if (!event) {
      throw new NotFoundException('Такой записи нет');
    }
    return event;
  }

  async update(id: number, updateBookingDto: UpdateBookingDto) {
    const booking = await this.bookingRepository.findOne({
      where: { id },
    });
    if (!booking) {
      throw new NotFoundException('Такая запись не найдена');
    }
    await this.bookingRepository.update(id, updateBookingDto);
    return `Запись ${booking.name} обновлена успешно`;
  }

  async remove(id: number) {
    const event = await this.bookingRepository.findOne({
      where: { id },
    });
    if (!event) {
      throw new NotFoundException('Такое мероприятие не найдено');
    }
    await this.bookingRepository.delete(id);
    return `Событие ${event.name} удалена успешно`;
  }
}

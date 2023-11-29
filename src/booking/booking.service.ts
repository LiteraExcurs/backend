import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';

import { UpdateEventDto } from '../event/dto/update-event.dto';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
  ) {}
  async create(query: CreateBookingDto) {
    await this.bookingRepository.save(query);
    return 'Вы успешно записались на экскурсию';
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

  async update(id: number, updateActivityDto: UpdateEventDto) {
    const booking = await this.bookingRepository.findOne({
      where: { id },
    });
    if (!booking) {
      throw new NotFoundException('Такая запись не найдена');
    }
    await this.bookingRepository.update(id, updateActivityDto);
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

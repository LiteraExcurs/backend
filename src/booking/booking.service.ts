import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { EventService } from '../event/event.service';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { CreateBookingDto } from './dto/create-booking.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { TelegramService } from '../telegram/telegram.service';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
    private eventService: EventService,
    private readonly mailerService: MailerService,
    private readonly telegramService: TelegramService,
  ) {}
  async create(query: CreateBookingDto) {
    const event = await this.eventService.findById(query.eventId);
    await this.bookingRepository.save({
      ...query,
      event: event,
      price: event.price,
      date: event.date,
    });
    const { name, date } = event;
    await this.mailerService.sendMail({
      to: query.email, // list of receivers
      subject: 'Подтверждение записи Literaexcurs', // Subject line
      html: `<h1>Вы успешно записались на экскурсию ${name}</h1>`,
    });
    await this.telegramService.sendMessage(
      `Новый посетитель ${query.name} запилсася на экскурсию ${name} ${date}`,
    );
    return `Вы успешно записались на экскурсию ${name}`;
  }
  async findAll() {
    return await this.bookingRepository.find({
      relations: {
        event: true,
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

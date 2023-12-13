import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { EventModule } from '../event/event.module';
import { TelegramModule } from '../telegram/telegram.module';

@Module({
  imports: [TypeOrmModule.forFeature([Booking]), EventModule, TelegramModule],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}

import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { ActivityModule } from '../activity/activity.module';
import { GuidesModule } from '../guides/guides.module';

@Module({
  imports: [TypeOrmModule.forFeature([Event]), ActivityModule, GuidesModule],
  controllers: [EventController],
  providers: [EventService],
  exports: [EventService],
})
export class EventModule {}

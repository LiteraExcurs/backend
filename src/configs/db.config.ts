import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Activity } from '../activity/entities/activity.entity';
import { Guide } from '../guides/entities/guide.entity';
import { User } from '../user/entities/user.entity';
import { Booking } from '../booking/entities/booking.entity';
import { Event } from '../event/entities/event.entity';
import { File } from '../files/entities/file.entity';

export const createDbConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  return {
    type: 'postgres',
    host: configService.get('POSTGRES_HOST'),
    port: configService.get('POSTGRES_PORT'),
    username: configService.get('POSTGRES_USERNAME'),
    password: configService.get('POSTGRES_PASSWORD'),
    database: configService.get('POSTGRES_DB'),
    entities: [Activity, File, Guide, User, Event, Booking],
    synchronize: configService.get('POSTGRES_SYNCHRONIZE'),
  };
};

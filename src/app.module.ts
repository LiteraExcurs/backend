import { Module } from '@nestjs/common';
import { ActivityModule } from './activity/activity.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesModule } from './files/files.module';
import { GuidesModule } from './guides/guides.module';
import { EventModule } from './event/event.module';
import { BookingModule } from './booking/booking.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createDbConfig } from './configs/db.config';
import { MailerModule } from '@nestjs-modules/mailer';
import { getMailerConfig } from './configs/mailer.config';
import { TelegramModule } from './telegram/telegram.module';
import { getTelegramConfig } from "./configs/telegram.comfig";

@Module({
  imports: [
    ActivityModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: createDbConfig,
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMailerConfig,
    }),
    TelegramModule.foRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTelegramConfig,
    }),
    FilesModule,
    GuidesModule,
    EventModule,
    BookingModule,
    UserModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

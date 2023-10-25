import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ActivityModule } from './activity/activity.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Activity } from './activity/entities/activity.entity';
import { FilesModule } from './files/files.module';
import { GuidesModule } from './guides/guides.module';
import { File } from './files/entities/file.entity';
import { Guide } from './guides/entities/guide.entity';

@Module({
  imports: [
    ActivityModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'student',
      database: 'literaex',
      entities: [Activity, File, Guide],
      synchronize: true,
    }),
    FilesModule,
    GuidesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

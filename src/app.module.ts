import { Module } from '@nestjs/common';
import { ActivityModule } from './activity/activity.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Activity } from './activity/entities/activity.entity';
import { FilesModule } from './files/files.module';
import { GuidesModule } from './guides/guides.module';
import { File } from './files/entities/file.entity';
import { Guide } from './guides/entities/guide.entity';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

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
      entities: [Activity, File, Guide, User],
      synchronize: true,
    }),
    FilesModule,
    GuidesModule,
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

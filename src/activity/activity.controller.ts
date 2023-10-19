import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Activity } from './entities/activity.entity';

@Controller('activity')
@ApiTags('Activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Post()
  create(@Body() createActivityDto: CreateActivityDto): Promise<Activity> {
    return this.activityService.create(createActivityDto);
  }

  @Get()
  findAll(): Promise<Array<Activity>> {
    return this.activityService.findAll();
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string): Promise<Activity> {
    return this.activityService.findOne(slug);
  }

  @Patch(':slug')
  @ApiCreatedResponse({ description: `Активсность {slug} обновлена` })
  update(
    @Param('slug') slug: string,
    @Body() updateActivityDto: UpdateActivityDto,
  ): Promise<string> {
    return this.activityService.update(slug, updateActivityDto);
  }

  @Delete(':slug')
  @ApiCreatedResponse({ description: `Активсность {slug} удалена` })
  remove(@Param('slug') slug: string): Promise<string> {
    return this.activityService.remove(slug);
  }
}

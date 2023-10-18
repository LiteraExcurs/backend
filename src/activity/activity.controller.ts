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

  @Get(':routName')
  findOne(@Param('routName') routName: string): Promise<Activity> {
    return this.activityService.findOne(routName);
  }

  @Patch(':routName')
  @ApiCreatedResponse({ description: `Активсность {routName} обновлена` })
  update(
    @Param('routName') routName: string,
    @Body() updateActivityDto: UpdateActivityDto,
  ): Promise<string> {
    return this.activityService.update(routName, updateActivityDto);
  }

  @Delete(':routName')
  @ApiCreatedResponse({ description: `Активсность {routName} удалена` })
  remove(@Param('routName') routName: string): Promise<string> {
    return this.activityService.remove(routName);
  }
}

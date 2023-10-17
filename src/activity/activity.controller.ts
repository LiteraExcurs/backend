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
import { ApiTags } from '@nestjs/swagger';

@Controller('activity')
@ApiTags('Activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Post()
  create(@Body() createActivityDto: CreateActivityDto) {
    return this.activityService.create(createActivityDto);
  }

  @Get()
  findAll() {
    return this.activityService.findAll();
  }

  @Get(':routName')
  findOne(@Param('routName') routName: string) {
    return this.activityService.findOne(routName);
  }

  @Patch(':routName')
  update(
    @Param('routName') routName: string,
    @Body() updateActivityDto: UpdateActivityDto,
  ) {
    return this.activityService.update(routName, updateActivityDto);
  }

  @Delete(':routName')
  remove(@Param('routName') routName: string) {
    return this.activityService.remove(routName);
  }
}

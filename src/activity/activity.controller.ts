import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Activity } from './entities/activity.entity';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('activity')
@ApiTags('Activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
  @Patch(':slug')
  @ApiCreatedResponse({ description: `Активсность {slug} обновлена` })
  update(
    @Param('slug') slug: string,
    @Body() updateActivityDto: UpdateActivityDto,
  ): Promise<string> {
    return this.activityService.update(slug, updateActivityDto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':slug')
  @ApiCreatedResponse({ description: `Активсность {slug} удалена` })
  remove(@Param('slug') slug: string): Promise<string> {
    return this.activityService.remove(slug);
  }
}

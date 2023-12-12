import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { ApiTags } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@Controller('event')
@ApiTags('Event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventService.create(createEventDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.eventService.findById(id);
  }

  @Get()
  findAll() {
    return this.eventService.findAll();
  }

  @Patch(':slug')
  update(@Param('slug') slug: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.update(slug, updateEventDto);
  }

  @Delete(':slug')
  remove(@Param('slug') slug: string) {
    return this.eventService.remove(slug);
  }
}

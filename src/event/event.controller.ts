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
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { ApiTags } from '@nestjs/swagger';

@Controller('event')
@ApiTags('Event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventService.create(createEventDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.findById(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.eventService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':slug')
  update(@Param('slug') slug: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.update(slug, updateEventDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':slug')
  remove(@Param('slug') slug: string) {
    return this.eventService.remove(slug);
  }
}

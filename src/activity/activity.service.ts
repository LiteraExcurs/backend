import { Injectable } from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity } from './entities/activity.entity';
import { FindManyOptions, IsNull, Not, Repository } from 'typeorm';


@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private activitesRepository: Repository<Activity>,
  ) { }

  async create(query: CreateActivityDto) {
    const newActivity = this.activitesRepository.save(query);
    return newActivity;
  }

  async findAll() {
   return await this.activitesRepository.find({
    select: {
      id: true,
      name: true,
      image: true,
    }
   });
  }

  findOne(id: number) {
    return `This action returns a #${id} activity`;
  }

  update(id: number, updateActivityDto: UpdateActivityDto) {
    return `This action updates a #${id} activity`;
  }

  remove(id: number) {
    return `This action removes a #${id} activity`;
  }
}

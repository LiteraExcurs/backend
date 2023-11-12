import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { genSalt, hash } from 'bcryptjs';
import { Repository, FindOneOptions } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOne(query: FindOneOptions<User>) {
    return await this.userRepository.findOne(query);
  }
  async createUser(payload: CreateUserDto): Promise<User> {
    const { login } = payload;

    if (await this.findOne({ where: [{ login }] })) {
      throw new ConflictException('Такой пользователь уже зарегистрирован');
    }
    const salt = await genSalt(10);
    const user = await this.userRepository.save({
      ...payload,
      password: await hash(payload.password, salt),
    });

    return user;
  }
}

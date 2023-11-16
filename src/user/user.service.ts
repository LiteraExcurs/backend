import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { genSalt, hash } from 'bcryptjs';
import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  findOne(query: FindOneOptions<User>) {
    return this.userRepository.findOne(query);
  }
  findByUsername(login: string) {
    return this.findOne({
      where: { login },
    });
  }
  async createUser(payload: CreateUserDto): Promise<User> {
    const { login } = payload;

    if (await this.findOne({ where: [{ login }] })) {
      throw new ConflictException('Такой пользователь уже зарегистрирован');
    }
    const salt = await genSalt(10);
    return await this.userRepository.save({
      ...payload,
      password: await hash(payload.password, salt),
    });
  }
}

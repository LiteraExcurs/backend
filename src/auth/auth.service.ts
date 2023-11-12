import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jetService: JwtService,
    private readonly userService: UserService,
  ) {}

  async validateUser(login: string, password: string) {
    const user = await this.userService.findOne({ where: [{ login }] });
    if (!user) {
      throw new UnauthorizedException('Такого пользователя не существует');
    }
    const isCorrectPassword = await compare(password, user.password);
    if (!isCorrectPassword) {
      throw new UnauthorizedException('Неверный пароль');
    }
    return { email: user.login };
  }

  async login(email: string) {
    const payload = { email };
    return {
      access_token: await this.jetService.signAsync(payload, {
        expiresIn: '7d',
      }),
    };
  }
}

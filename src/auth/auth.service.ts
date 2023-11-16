import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { compare } from 'bcryptjs';


@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async validateUser(login: string, password: string) {
    const user = await this.userService.findByUsername(login);
    if (!user) {
      throw new UnauthorizedException('Такого пользователя не существует');
    }
    const isCorrectPassword = await compare(password, user.password);
    if (!isCorrectPassword) {
      throw new UnauthorizedException('Неверный пароль');
    }
    return { email: user.login };
  }

  async login(login: string) {
    const payload = { login };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
      }),
    };
  }
}

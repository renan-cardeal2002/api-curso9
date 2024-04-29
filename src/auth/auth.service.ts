import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService, private jwtService: JwtService) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUser(username, pass);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { name: user.name };
    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
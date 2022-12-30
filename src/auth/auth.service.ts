import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.getLoginUser(email);
    const isMatch = await bcrypt.compare(password, user.password);
    if (user && isMatch) {
      delete user.password;
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { id: user.id, email: user.email, role: user.role };
    return { ...user, access_token: this.jwtService.sign(payload) };
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

  async getUniqueUsername(name: string) {
    const username = name.trim().replace(/[^a-zA-Z0-9 ]/g, '').replace(/\s+/g, '-').toLowerCase();
    let user = await this.findByUsername(username);
    let newUsername = username;
    if (user) {
      let count = 1;
      do {
        newUsername = username + count;
        user = await this.findByUsername(newUsername);
        count++;
      } while (!!user);
    }
    return newUsername;
  }

  async create(createUserDto: CreateUserDto) {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.username = await this.getUniqueUsername(createUserDto.name);

    const savedUser = await this.userRepository.save(createUserDto);
    if (savedUser) delete savedUser.password;
    return savedUser;
  }

  findAll() {
    return this.userRepository.find({ select: { id: true, name:true, username: true, email: true, role: true, createdAt: true, updatedAt: true } });
  }

  findOne(id: number) {
    return this.userRepository.findOne({ select: { id: true, name:true, username: true, email: true, role: true, createdAt: true, updatedAt: true }, where: { id } });
  }

  findByEmail(email: string) {
    return this.userRepository.findOne({ select: { id: true, name:true, username: true, email: true, role: true, createdAt: true, updatedAt: true }, where: { email } });
  }

  findByUsername(username: string) {
    return this.userRepository.findOne({ select: { id: true, name:true, username: true, email: true, role: true, createdAt: true, updatedAt: true }, where: { username } });
  }

  getLoginUser(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}


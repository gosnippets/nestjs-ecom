import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateSnippetDto } from '../dto/create-snippet.dto';
import { UpdateSnippetDto } from '../dto/update-snippet.dto';
import { Snippet } from '../entities/snippet.entity';

@Injectable()
export class SnippetsService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Snippet) private snippetRepository: Repository<Snippet>
  ) { }

  async getUniqueSlug(slug: string) {
    const mainSlug = slug.trim().replace(/[^a-zA-Z0-9 ]/g, '').replace(/\s+/g, '-').toLowerCase();
    let user = await this.findBySlug(mainSlug);
    let newSlug = mainSlug;
    if (user) {
      let count = 1;
      do {
        newSlug = mainSlug + count;
        user = await this.findBySlug(newSlug);
        count++;
      } while (!!user);
    }
    return newSlug;
  }

  async create(createSnippetDto: CreateSnippetDto) {
    createSnippetDto.slug = await this.getUniqueSlug(createSnippetDto.title);
    const user = await this.userRepository.findOneBy({ id: createSnippetDto.userId });
    if (!user) throw new HttpException('Invalid User', HttpStatus.BAD_REQUEST);
    const newPost = this.snippetRepository.create({ ...createSnippetDto, user });
    return this.snippetRepository.save(newPost);
  }

  findAll() {
    return this.snippetRepository.find({ relations: { user: true } });
  }

  findOne(id: number) {
    return this.snippetRepository.findOne({ where: { id }, relations: { user: true } });
  }

  findBySlug(slug: string) {
    return this.snippetRepository.findOne({ where: { slug }, relations: { user: true } });
  }

  update(id: number, updateSnippetDto: UpdateSnippetDto) {
    return this.snippetRepository.update(id, updateSnippetDto);
  }

  remove(id: number) {
    return this.snippetRepository.delete(id);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSnippetDto } from './dto/create-snippet.dto';
import { UpdateSnippetDto } from './dto/update-snippet.dto';
import { Snippet } from './entities/snippet.entity';

@Injectable()
export class SnippetsService {
  constructor(@InjectRepository(Snippet) private snippetRepository: Repository<Snippet>) { }

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
    return this.snippetRepository.save(createSnippetDto);
  }

  findAll() {
    return this.snippetRepository.find();
  }

  findOne(id: number) {
    return this.snippetRepository.findOne({ where: { id } });
  }

  findBySlug(slug: string) {
    return this.snippetRepository.findOne({ where: { slug } });
  }

  update(id: number, updateSnippetDto: UpdateSnippetDto) {
    return this.snippetRepository.update(id, updateSnippetDto);
  }

  remove(id: number) {
    return this.snippetRepository.delete(id);
  }
}

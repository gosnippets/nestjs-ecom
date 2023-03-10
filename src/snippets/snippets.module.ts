import { Module } from '@nestjs/common';
import { SnippetsService } from './snippets.service';
import { SnippetsController } from './snippets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Snippet } from '../entities/snippet.entity';
import { User } from 'src/entities/user.entity';

@Module({
  controllers: [SnippetsController],
  providers: [SnippetsService],
  exports: [SnippetsService],
  imports: [TypeOrmModule.forFeature([Snippet, User])]
})
export class SnippetsModule {}

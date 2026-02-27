import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { CommentsRepository } from './comments.repository';
import { TicketsModule } from '../tickets/tickets.module';

@Module({
  imports: [TicketsModule],
  controllers: [CommentsController],
  providers: [CommentsService, CommentsRepository],
  exports: [CommentsService],
})
export class CommentsModule {}

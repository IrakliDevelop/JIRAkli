import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CommentsRepository } from './comments.repository';
import { TicketsService } from '../tickets/tickets.service';
import type {
  Comment,
  CreateCommentDto,
  UpdateCommentDto,
} from '@jirakli/shared';

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentsRepository: CommentsRepository,
    private readonly ticketsService: TicketsService,
  ) {}

  async findByTicket(ticketId: string): Promise<Comment[]> {
    // Verify ticket exists
    await this.ticketsService.findById(ticketId);

    return this.commentsRepository.findByTicket(ticketId);
  }

  async findById(id: string): Promise<Comment> {
    const comment = await this.commentsRepository.findById(id);

    if (!comment) {
      throw new NotFoundException(`Comment with ID "${id}" not found`);
    }

    return comment;
  }

  async create(
    ticketId: string,
    dto: CreateCommentDto,
    authorId: string,
  ): Promise<Comment> {
    // Verify ticket exists
    await this.ticketsService.findById(ticketId);

    return this.commentsRepository.create({
      ...dto,
      ticketId,
      authorId,
    });
  }

  async update(
    id: string,
    dto: UpdateCommentDto,
    userId: string,
  ): Promise<Comment> {
    const comment = await this.findById(id);

    // Only the author can edit their comment
    if (comment.authorId !== userId) {
      throw new ForbiddenException('You can only edit your own comments');
    }

    return this.commentsRepository.update(id, dto);
  }

  async delete(id: string, userId: string): Promise<void> {
    const comment = await this.findById(id);

    // Only the author can delete their comment
    if (comment.authorId !== userId) {
      throw new ForbiddenException('You can only delete your own comments');
    }

    await this.commentsRepository.delete(id);
  }
}

import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { CreateCommentDto, UpdateCommentDto } from './dto';
import { JwtAuthGuard, CurrentUser } from '../../common';
import type { Comment } from '@jirakli/shared';

@Controller()
@ApiTags('comments')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get('tickets/:ticketId/comments')
  @ApiOperation({ summary: 'List comments for a ticket' })
  @ApiResponse({ status: 200, description: 'Comments retrieved successfully' })
  async findByTicket(
    @Param('ticketId', ParseUUIDPipe) ticketId: string,
  ): Promise<{ data: Comment[] }> {
    const comments = await this.commentsService.findByTicket(ticketId);
    return { data: comments };
  }

  @Post('tickets/:ticketId/comments')
  @ApiOperation({ summary: 'Add a comment to a ticket' })
  @ApiResponse({ status: 201, description: 'Comment created successfully' })
  async create(
    @Param('ticketId', ParseUUIDPipe) ticketId: string,
    @Body() dto: CreateCommentDto,
    @CurrentUser('id') userId: string,
  ): Promise<{ data: Comment }> {
    const comment = await this.commentsService.create(ticketId, dto, userId);
    return { data: comment };
  }

  @Patch('comments/:id')
  @ApiOperation({ summary: 'Edit a comment' })
  @ApiResponse({ status: 200, description: 'Comment updated successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden - not the author' })
  @ApiResponse({ status: 404, description: 'Comment not found' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateCommentDto,
    @CurrentUser('id') userId: string,
  ): Promise<{ data: Comment }> {
    const comment = await this.commentsService.update(id, dto, userId);
    return { data: comment };
  }

  @Delete('comments/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a comment' })
  @ApiResponse({ status: 204, description: 'Comment deleted successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden - not the author' })
  @ApiResponse({ status: 404, description: 'Comment not found' })
  async delete(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser('id') userId: string,
  ): Promise<void> {
    await this.commentsService.delete(id, userId);
  }
}

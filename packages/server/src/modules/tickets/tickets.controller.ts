import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
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
import { TicketsService } from './tickets.service';
import { CreateTicketDto, UpdateTicketDto, TicketFiltersDto } from './dto';
import { JwtAuthGuard, CurrentUser } from '../../common';
import type { Ticket, PaginatedResponse } from '@jirakli/shared';

@Controller()
@ApiTags('tickets')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Get('projects/:projectId/tickets')
  @ApiOperation({ summary: 'List tickets for a project' })
  @ApiResponse({ status: 200, description: 'Tickets retrieved successfully' })
  async findByProject(
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @Query() filters: TicketFiltersDto,
  ): Promise<PaginatedResponse<Ticket>> {
    const { page, pageSize, ...ticketFilters } = filters;
    return this.ticketsService.findByProject(projectId, ticketFilters, {
      page,
      pageSize,
    });
  }

  @Get('tickets/:id')
  @ApiOperation({ summary: 'Get ticket by ID' })
  @ApiResponse({ status: 200, description: 'Ticket retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Ticket not found' })
  async findById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<{ data: Ticket }> {
    const ticket = await this.ticketsService.findById(id);
    return { data: ticket };
  }

  @Post('projects/:projectId/tickets')
  @ApiOperation({ summary: 'Create a new ticket' })
  @ApiResponse({ status: 201, description: 'Ticket created successfully' })
  async create(
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @Body() dto: CreateTicketDto,
    @CurrentUser('id') userId: string,
  ): Promise<{ data: Ticket }> {
    const ticket = await this.ticketsService.create(projectId, dto, userId);
    return { data: ticket };
  }

  @Patch('tickets/:id')
  @ApiOperation({ summary: 'Update a ticket' })
  @ApiResponse({ status: 200, description: 'Ticket updated successfully' })
  @ApiResponse({ status: 404, description: 'Ticket not found' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateTicketDto,
  ): Promise<{ data: Ticket }> {
    const ticket = await this.ticketsService.update(id, dto);
    return { data: ticket };
  }

  @Delete('tickets/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a ticket' })
  @ApiResponse({ status: 204, description: 'Ticket deleted successfully' })
  @ApiResponse({ status: 404, description: 'Ticket not found' })
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.ticketsService.delete(id);
  }
}

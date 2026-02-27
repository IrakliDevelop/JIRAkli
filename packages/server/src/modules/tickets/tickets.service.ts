import { Injectable, NotFoundException } from '@nestjs/common';
import { TicketsRepository } from './tickets.repository';
import { ProjectsService } from '../projects/projects.service';
import type {
  Ticket,
  CreateTicketDto,
  UpdateTicketDto,
  TicketFilters,
  PaginationParams,
  PaginatedResponse,
  DEFAULT_PAGE_SIZE,
} from '@jirakli/shared';

@Injectable()
export class TicketsService {
  constructor(
    private readonly ticketsRepository: TicketsRepository,
    private readonly projectsService: ProjectsService,
  ) {}

  async findByProject(
    projectId: string,
    filters?: TicketFilters,
    pagination?: PaginationParams,
  ): Promise<PaginatedResponse<Ticket>> {
    // Verify project exists
    await this.projectsService.findById(projectId);

    const { items, total } = await this.ticketsRepository.findByProject(
      projectId,
      filters,
      pagination,
    );

    const page = pagination?.page ?? 1;
    const pageSize = pagination?.pageSize ?? 20;

    return {
      data: items,
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    };
  }

  async findById(id: string): Promise<Ticket> {
    const ticket = await this.ticketsRepository.findById(id);

    if (!ticket) {
      throw new NotFoundException(`Ticket with ID "${id}" not found`);
    }

    return ticket;
  }

  async create(
    projectId: string,
    dto: CreateTicketDto,
    reporterId: string,
  ): Promise<Ticket> {
    // Verify project exists
    await this.projectsService.findById(projectId);

    // Get next ticket number for project
    const number = await this.ticketsRepository.getNextNumber(projectId);

    return this.ticketsRepository.create({
      ...dto,
      projectId,
      number,
      reporterId,
      status: 'backlog',
      priority: dto.priority ?? 'medium',
    });
  }

  async update(id: string, dto: UpdateTicketDto): Promise<Ticket> {
    // Verify ticket exists
    await this.findById(id);

    return this.ticketsRepository.update(id, dto);
  }

  async delete(id: string): Promise<void> {
    // Verify ticket exists
    await this.findById(id);

    await this.ticketsRepository.delete(id);
  }
}

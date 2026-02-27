import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { ProjectsRepository } from './projects.repository';
import type {
  Project,
  CreateProjectDto,
  UpdateProjectDto,
} from '@jirakli/shared';

@Injectable()
export class ProjectsService {
  constructor(private readonly projectsRepository: ProjectsRepository) {}

  async findAll(): Promise<Project[]> {
    return this.projectsRepository.findAll();
  }

  async findById(id: string): Promise<Project> {
    const project = await this.projectsRepository.findById(id);

    if (!project) {
      throw new NotFoundException(`Project with ID "${id}" not found`);
    }

    return project;
  }

  async create(dto: CreateProjectDto, userId: string): Promise<Project> {
    // Check if key already exists
    const existing = await this.projectsRepository.findByKey(dto.key);
    if (existing) {
      throw new ConflictException(`Project key "${dto.key}" already exists`);
    }

    return this.projectsRepository.create({
      ...dto,
      createdById: userId,
    });
  }

  async update(id: string, dto: UpdateProjectDto): Promise<Project> {
    // Verify project exists
    await this.findById(id);

    return this.projectsRepository.update(id, dto);
  }

  async delete(id: string): Promise<void> {
    // Verify project exists
    await this.findById(id);

    await this.projectsRepository.delete(id);
  }

  async exists(id: string): Promise<boolean> {
    return this.projectsRepository.exists(id);
  }
}

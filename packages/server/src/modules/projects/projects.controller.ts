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
import { ProjectsService } from './projects.service';
import { CreateProjectDto, UpdateProjectDto } from './dto';
import { JwtAuthGuard, CurrentUser } from '../../common';
import type { Project } from '@jirakli/shared';

@Controller('projects')
@ApiTags('projects')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  @ApiOperation({ summary: 'List all projects' })
  @ApiResponse({ status: 200, description: 'Projects retrieved successfully' })
  async findAll(): Promise<{ data: Project[] }> {
    const projects = await this.projectsService.findAll();
    return { data: projects };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get project by ID' })
  @ApiResponse({ status: 200, description: 'Project retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Project not found' })
  async findById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<{ data: Project }> {
    const project = await this.projectsService.findById(id);
    return { data: project };
  }

  @Post()
  @ApiOperation({ summary: 'Create a new project' })
  @ApiResponse({ status: 201, description: 'Project created successfully' })
  @ApiResponse({ status: 409, description: 'Project key already exists' })
  async create(
    @Body() dto: CreateProjectDto,
    @CurrentUser('id') userId: string,
  ): Promise<{ data: Project }> {
    const project = await this.projectsService.create(dto, userId);
    return { data: project };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a project' })
  @ApiResponse({ status: 200, description: 'Project updated successfully' })
  @ApiResponse({ status: 404, description: 'Project not found' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateProjectDto,
  ): Promise<{ data: Project }> {
    const project = await this.projectsService.update(id, dto);
    return { data: project };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a project' })
  @ApiResponse({ status: 204, description: 'Project deleted successfully' })
  @ApiResponse({ status: 404, description: 'Project not found' })
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.projectsService.delete(id);
  }
}

import {
  Controller,
  Get,
  Patch,
  Param,
  Body,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto';
import { JwtAuthGuard, CurrentUser } from '../../common';
import type { PublicUser } from '@jirakli/shared';

@Controller('users')
@ApiTags('users')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'List all users' })
  @ApiResponse({ status: 200, description: 'Users retrieved successfully' })
  async findAll(): Promise<{ data: PublicUser[] }> {
    const users = await this.usersService.findAll();
    return { data: users };
  }

  @Get('me')
  @ApiOperation({ summary: 'Get current user' })
  @ApiResponse({ status: 200, description: 'Current user retrieved' })
  async getMe(
    @CurrentUser('id') userId: string,
  ): Promise<{ data: PublicUser }> {
    const user = await this.usersService.findById(userId);
    return { data: user };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, description: 'User retrieved successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async findById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<{ data: PublicUser }> {
    const user = await this.usersService.findById(id);
    return { data: user };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<{ data: PublicUser }> {
    const user = await this.usersService.update(id, dto);
    return { data: user };
  }
}

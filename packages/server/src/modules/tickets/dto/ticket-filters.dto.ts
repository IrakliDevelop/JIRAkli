import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum, IsUUID, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import {
  TICKET_STATUS,
  TICKET_PRIORITY,
  type TicketStatus,
  type TicketPriority,
  MAX_PAGE_SIZE,
} from '@jirakli/shared';

export class TicketFiltersDto {
  @ApiPropertyOptional({ enum: TICKET_STATUS })
  @IsEnum(TICKET_STATUS)
  @IsOptional()
  status?: TicketStatus;

  @ApiPropertyOptional({ enum: TICKET_PRIORITY })
  @IsEnum(TICKET_PRIORITY)
  @IsOptional()
  priority?: TicketPriority;

  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  assigneeId?: string;

  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  reporterId?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  search?: string;

  @ApiPropertyOptional({ default: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number;

  @ApiPropertyOptional({ default: 20, maximum: MAX_PAGE_SIZE })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(MAX_PAGE_SIZE)
  @IsOptional()
  pageSize?: number;
}

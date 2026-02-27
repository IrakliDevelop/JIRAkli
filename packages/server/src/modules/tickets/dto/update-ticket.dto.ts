import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  IsEnum,
  IsUUID,
  ValidateIf,
} from 'class-validator';
import {
  TICKET_STATUS,
  TICKET_PRIORITY,
  type TicketStatus,
  type TicketPriority,
} from '@jirakli/shared';

export class UpdateTicketDto {
  @ApiPropertyOptional({ example: 'Fix login bug' })
  @IsString()
  @IsOptional()
  @MinLength(1)
  @MaxLength(255)
  title?: string;

  @ApiPropertyOptional({ example: 'Detailed description of the bug...' })
  @IsString()
  @IsOptional()
  @MaxLength(10000)
  description?: string;

  @ApiPropertyOptional({ enum: TICKET_STATUS, example: 'in_progress' })
  @IsEnum(TICKET_STATUS)
  @IsOptional()
  status?: TicketStatus;

  @ApiPropertyOptional({ enum: TICKET_PRIORITY, example: 'high' })
  @IsEnum(TICKET_PRIORITY)
  @IsOptional()
  priority?: TicketPriority;

  @ApiPropertyOptional()
  @ValidateIf((o) => o.assigneeId !== null)
  @IsUUID()
  @IsOptional()
  assigneeId?: string | null;
}

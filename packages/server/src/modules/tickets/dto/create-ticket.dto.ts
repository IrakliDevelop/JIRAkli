import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength, IsOptional, IsEnum, IsUUID } from 'class-validator';
import { TICKET_PRIORITY, type TicketPriority } from '@jirakli/shared';

export class CreateTicketDto {
  @ApiProperty({ example: 'Fix login bug' })
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  title: string;

  @ApiPropertyOptional({ example: 'Detailed description of the bug...' })
  @IsString()
  @IsOptional()
  @MaxLength(10000)
  description?: string;

  @ApiPropertyOptional({ enum: TICKET_PRIORITY, example: 'medium' })
  @IsEnum(TICKET_PRIORITY)
  @IsOptional()
  priority?: TicketPriority;

  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  assigneeId?: string;
}

import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'John Doe' })
  @IsString()
  @IsOptional()
  @MinLength(1)
  @MaxLength(255)
  displayName?: string;
}

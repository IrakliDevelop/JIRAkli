import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength, IsOptional } from 'class-validator';

export class UpdateProjectDto {
  @ApiPropertyOptional({ example: 'Jirakli' })
  @IsString()
  @IsOptional()
  @MinLength(1)
  @MaxLength(255)
  name?: string;

  @ApiPropertyOptional({ example: 'Project description' })
  @IsString()
  @IsOptional()
  @MaxLength(5000)
  description?: string;
}

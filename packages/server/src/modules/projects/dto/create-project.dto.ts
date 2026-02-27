import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsOptional,
} from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({
    example: 'JIR',
    description: 'Project key (2-6 uppercase letters)',
  })
  @IsString()
  @MinLength(2)
  @MaxLength(6)
  @Matches(/^[A-Z]+$/, { message: 'Key must be uppercase letters only' })
  key: string;

  @ApiProperty({ example: 'Jirakli' })
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  name: string;

  @ApiPropertyOptional({ example: 'Project description' })
  @IsString()
  @IsOptional()
  @MaxLength(5000)
  description?: string;
}

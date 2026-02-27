import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength } from 'class-validator';

export class UpdateCommentDto {
  @ApiProperty({ example: 'Updated comment content.' })
  @IsString()
  @MinLength(1)
  @MaxLength(10000)
  content: string;
}

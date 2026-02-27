import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ example: 'This is a comment on the ticket.' })
  @IsString()
  @MinLength(1)
  @MaxLength(10000)
  content: string;
}

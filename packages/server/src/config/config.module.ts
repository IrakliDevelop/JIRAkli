import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import * as path from 'path';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        path.join(process.cwd(), '../../.env.local'),
        path.join(process.cwd(), '../../.env'),
      ],
    }),
  ],
})
export class ConfigModule {}

import { Module } from '@nestjs/common';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import { TicketsRepository } from './tickets.repository';
import { ProjectsModule } from '../projects/projects.module';

@Module({
  imports: [ProjectsModule],
  controllers: [TicketsController],
  providers: [TicketsService, TicketsRepository],
  exports: [TicketsService],
})
export class TicketsModule {}

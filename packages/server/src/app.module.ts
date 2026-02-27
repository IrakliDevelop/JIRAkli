import { Module } from '@nestjs/common';
import { ConfigModule } from './config';
import { DatabaseModule } from './database';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { TicketsModule } from './modules/tickets/tickets.module';
import { CommentsModule } from './modules/comments/comments.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    AuthModule,
    UsersModule,
    ProjectsModule,
    TicketsModule,
    CommentsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}

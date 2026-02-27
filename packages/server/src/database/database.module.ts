import { Module, Global, OnModuleDestroy, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Database from 'better-sqlite3';
import { drizzle, BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import * as schema from '@jirakli/shared';

export const DATABASE = 'DATABASE';
export const SQLITE = 'SQLITE';

export type DrizzleDatabase = BetterSQLite3Database<typeof schema>;

@Global()
@Module({
  providers: [
    {
      provide: SQLITE,
      useFactory: (configService: ConfigService) => {
        const dbPath = configService.get<string>(
          'DATABASE_PATH',
          './data/jirakli.db',
        );
        const sqlite = new Database(dbPath, {
          // Allow multiple connections in WAL mode
          fileMustExist: false,
        });

        // Enable WAL mode for better concurrency
        sqlite.pragma('journal_mode = WAL');
        // Enable foreign keys
        sqlite.pragma('foreign_keys = ON');
        // Optimize for read-heavy workloads
        sqlite.pragma('synchronous = NORMAL');

        return sqlite;
      },
      inject: [ConfigService],
    },
    {
      provide: DATABASE,
      useFactory: (sqlite: Database.Database) => {
        return drizzle(sqlite, { schema });
      },
      inject: [SQLITE],
    },
  ],
  exports: [DATABASE],
})
export class DatabaseModule implements OnModuleDestroy {
  constructor(@Inject(SQLITE) private readonly sqlite: Database.Database) {}

  onModuleDestroy() {
    this.sqlite.close();
  }
}

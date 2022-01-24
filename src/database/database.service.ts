import { INestApplication, Injectable, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaClient } from "@prisma/client";
import { Client } from "pg";

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  pgClient: Client;

  constructor(private configService: ConfigService) {
    super({
      log: ["query", "info", "warn", "error"],
    });
    this.pgClient = new Client({
      connectionString: configService.get<string>("PG_DATABASE_URL"),
    });
    const before = Date.now();
    this.pgClient.connect().then((err) => {
      console.log("Connected to DB via node-postgres", {
        err,
        duration: Date.now() - before,
      });
    });
  }

  async onModuleInit() {
    const before = Date.now();
    await this.$connect();
    const after = Date.now();
    console.log("Connected to DB via Prisma", {
      duration: Date.now() - before,
    });

    await this.$use(async (params, next) => {
      const before = Date.now();

      const result = await next(params);
      const after = Date.now();

      console.log(
        `Prisma Query ${params.model}.${params.action} took ${
          after - before
        }ms`,
        { before, after }
      );
      console.log("result", result);

      return result;
    });
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on("beforeExit", async () => {
      await app.close();
    });
  }

  pg() {
    return this.pgClient;
  }
}

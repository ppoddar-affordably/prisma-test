import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { Client } from "pg";

interface sqlOptions {
  explain?: boolean;
}

@Injectable()
export class SqlService {
  constructor(private database: DatabaseService) {}

  /*
   * Prisma
   */
  async queryPrisma(query: string): Promise<any> {
    console.log("Prisma Query", { query });
    const before = Date.now();
    const result = await this.database.$queryRawUnsafe(query);
    const after = Date.now();
    return {
      result,
      duration: after - before,
    };
  }

  /*
   * Node-Postgres
   */
  async queryPg(query: string): Promise<any> {
    console.log("Node Postgres", { query });
    const before = Date.now();
    const result = await this.database.pg().query(query);
    const after = Date.now();
    return {
      result,
      duration: after - before,
    };
  }
}

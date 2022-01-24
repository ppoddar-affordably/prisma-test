import { Body, Controller, Post } from "@nestjs/common";
import { SqlService } from "./sql.service";

@Controller("sql")
export class SqlController {
  constructor(private sqlService: SqlService) {}

  @Post("/prisma")
  async post(@Body() { query }: { query: string }) {
    const result = await this.sqlService.queryPrisma(query);
    return result;
  }

  @Post("/pg")
  async postPg(@Body() { query }: { query: string }) {
    const result = await this.sqlService.queryPg(query);
    return result;
  }
}

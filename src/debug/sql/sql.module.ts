import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { SqlController } from "./sql.controller";
import { SqlService } from "./sql.service";

@Module({
  imports: [DatabaseModule],
  controllers: [SqlController],
  providers: [SqlService],
  exports: [SqlService],
})
export class SqlModule {}

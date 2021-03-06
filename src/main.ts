import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DatabaseService } from "./database/database.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  const databaseService: DatabaseService = app.get(DatabaseService);
  app.enableShutdownHooks();
}
bootstrap();

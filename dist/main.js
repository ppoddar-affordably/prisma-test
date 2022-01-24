"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const database_service_1 = require("./database/database.service");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    await app.listen(3000);
    const databaseService = app.get(database_service_1.DatabaseService);
    app.enableShutdownHooks();
}
bootstrap();
//# sourceMappingURL=main.js.map
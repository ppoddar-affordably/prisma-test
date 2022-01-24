"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const client_1 = require("@prisma/client");
const pg_1 = require("pg");
let DatabaseService = class DatabaseService extends client_1.PrismaClient {
    constructor(configService) {
        super({
            log: ["query", "info", "warn", "error"],
        });
        this.configService = configService;
        this.pgClient = new pg_1.Client({
            connectionString: configService.get("PG_DATABASE_URL"),
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
            console.log(`Prisma Query ${params.model}.${params.action} took ${after - before}ms`, { before, after });
            console.log("result", result);
            return result;
        });
    }
    async enableShutdownHooks(app) {
        this.$on("beforeExit", async () => {
            await app.close();
        });
    }
    pg() {
        return this.pgClient;
    }
};
DatabaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], DatabaseService);
exports.DatabaseService = DatabaseService;
//# sourceMappingURL=database.service.js.map
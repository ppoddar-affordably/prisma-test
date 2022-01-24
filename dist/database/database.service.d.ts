import { INestApplication, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaClient } from "@prisma/client";
import { Client } from "pg";
export declare class DatabaseService extends PrismaClient implements OnModuleInit {
    private configService;
    pgClient: Client;
    constructor(configService: ConfigService);
    onModuleInit(): Promise<void>;
    enableShutdownHooks(app: INestApplication): Promise<void>;
    pg(): Client;
}

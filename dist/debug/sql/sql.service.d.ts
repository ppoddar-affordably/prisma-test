import { DatabaseService } from "src/database/database.service";
export declare class SqlService {
    private database;
    constructor(database: DatabaseService);
    queryPrisma(query: string): Promise<any>;
    queryPg(query: string): Promise<any>;
}

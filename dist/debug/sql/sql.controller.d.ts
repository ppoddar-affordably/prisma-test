import { SqlService } from "./sql.service";
export declare class SqlController {
    private sqlService;
    constructor(sqlService: SqlService);
    post({ query }: {
        query: string;
    }): Promise<any>;
    postPg({ query }: {
        query: string;
    }): Promise<any>;
}

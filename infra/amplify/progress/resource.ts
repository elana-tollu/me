import {Stack} from "aws-cdk-lib";
import {createLambda} from "./lambda";
import { createDb } from "./db";

export function createProgress(scope: Stack){
    const db = createDb(scope);

    const env = {
        DB: db.tableName,
    }

    const lambda = createLambda(scope, env);

    db.grantReadWriteData(lambda);
}
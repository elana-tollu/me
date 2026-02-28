import {Stack} from "aws-cdk-lib";
import {createLambda} from "./lambda";
import { createDb } from "./db";
import {createLambdaUrl} from "./lambda-url";

export function createProgress(scope: Stack){
    const db = createDb(scope);

    const env = {
        DB: db.tableName,
    }

    const lambda = createLambda(scope, env);

    db.grantReadWriteData(lambda);

    const lambdaUrl = createLambdaUrl(lambda);

    return lambdaUrl.url;
}
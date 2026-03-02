import {Stack} from "aws-cdk-lib";
import {createLambda} from "./lambda";
import { createDb } from "./db";
import {createLambdaUrl} from "./lambda-url";

export function createProgress(scope: Stack, userPoolId: string, clientId: string){
    const db = createDb(scope);

    const env = {
        DB: db.tableName,
        USER_POOL_ID: userPoolId,
        USER_POOL_CLIENT_ID: clientId,
    }

    const lambda = createLambda(scope, env);

    db.grantReadWriteData(lambda);

    const lambdaUrl = createLambdaUrl(lambda);

    return lambdaUrl.url;
}
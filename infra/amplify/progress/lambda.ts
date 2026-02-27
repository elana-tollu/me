import { Stack } from "aws-cdk-lib";
import {Architecture, Code, Function, Runtime } from "aws-cdk-lib/aws-lambda";
import {join} from 'node:path';

export function createLambda(scope: Stack){

    const __dirname = import.meta.dirname;
    const codePath = join(__dirname, '../../../lambdas/progress/dist/dist.zip');

    return new Function(scope, 'ProgressLambda', {
        architecture: Architecture.ARM_64,
        runtime: Runtime.NODEJS_24_X,
        code: Code.fromAsset(codePath),
        handler: 'handler.handler',
        memorySize: 128,
    });
}


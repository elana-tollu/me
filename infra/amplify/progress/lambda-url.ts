import {Function, FunctionUrlAuthType} from "aws-cdk-lib/aws-lambda";

export function createLambdaUrl(lambda: Function) {

    return lambda.addFunctionUrl({
        authType: FunctionUrlAuthType.NONE,
    });
}
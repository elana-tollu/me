import {Stack} from "aws-cdk-lib";
import {createLambda} from "./lambda";

export function createProgress(scope: Stack){
    createLambda(scope);
    // createDb(scope);
}
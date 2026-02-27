import {Stack} from "aws-cdk-lib";
import {createLambda} from "./lambda";
import { createDb } from "./db";

export function createProgress(scope: Stack){
    createLambda(scope);
    createDb(scope);
}
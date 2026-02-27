import {Stack} from "aws-cdk-lib";
import {AttributeType, TableV2} from "aws-cdk-lib/aws-dynamodb";

export function createDb(scope: Stack){

   return new TableV2(scope, 'ProgressDb', {
        partitionKey: {
            name: 'PK',
            type: AttributeType.STRING
        },
        sortKey: {
            name: 'SK',
            type: AttributeType.STRING
        }
    });
}
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
    DynamoDBDocumentClient,
    QueryCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});

const dynamo = DynamoDBDocumentClient.from(client);

const tableName = process.env.DB;

//todo убедиться в том, что TableName определена

export const handler = async () => {

    const query = new QueryCommand({
        TableName: tableName,
        KeyConditionExpression: "PK = :pk",
        ExpressionAttributeValues: {
            ":pk": "mysh_weight"
        }
    });

    const dbResponse = await dynamo.send(query);

    if (!dbResponse.Items) {
        throw new Error(`Failed to send dynamo response from DynamoDB ${dbResponse}`);
    }

    const dayWeights = dbResponse.Items.map((item) => ({
        date: item.SK,
        weight: item.weight
    }));

    /*
     * Generate HTTP response using 200 status code with a simple body.
     */
    const response = {
        dayWeights
    };

    return response;
};

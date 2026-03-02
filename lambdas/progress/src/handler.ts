import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
    DynamoDBDocumentClient,
    QueryCommand,
} from "@aws-sdk/lib-dynamodb";
import { CognitoJwtVerifier } from 'aws-jwt-verify';
import {APIGatewayProxyHandlerV2} from "aws-lambda";

const client = new DynamoDBClient({});

const dynamo = DynamoDBDocumentClient.from(client);

const tableName = process.env.DB;
const userPoolId = process.env.USER_POOL_ID!;
const clientId = process.env.USER_POOL_CLIENT_ID!;

//todo убедиться в том, что TableName и userPoolId определена

export const handler: APIGatewayProxyHandlerV2 = async (event) => {

    const authHeader = event.headers.authorization;
    console.log("authHeader", authHeader);

    const token = extractBearerToken(authHeader);
    console.log("token", token);

    const userId = await extractUserId(token);
    console.log("userId", userId);

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
        weight: item.weight,
    }));

    /*
     * Generate HTTP response using 200 status code with a simple body.
     */
    const responseBody = {
        dayWeights,
        userId,
    };

    return {
        body: JSON.stringify(responseBody),
    };
};

function extractBearerToken(authHeader?: string) {
    if (authHeader?.startsWith('Bearer ')) {
        return authHeader.substring(7);
    }
}

async function extractUserId(token?: string ) {

    if (!token) {
        return undefined;
    }
    try {
        const verifier = CognitoJwtVerifier.create({
            userPoolId,
            tokenUse: 'access',
            clientId,
        });

        const payload = await verifier.verify(token);

        return payload.sub;
    } catch (err) {
        console.error('Error verifying JWT:', err);
    }
}

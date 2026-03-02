import { defineBackend } from '@aws-amplify/backend';
import {createProgress} from "./progress/resource";
import {auth} from "./auth/resource";

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
    auth
});

const userPoolId = backend.auth.resources.userPool.userPoolId;
const clientId = backend.auth.resources.userPoolClient.userPoolClientId;

const progressStack = backend.createStack('ProgressStack');

const progressApi = createProgress(progressStack, userPoolId, clientId);

backend.addOutput({
    custom: {
        progressApi
    },
});
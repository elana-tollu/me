import { defineBackend } from '@aws-amplify/backend';
import {createProgress} from "./progress/resource";
import {auth} from "./auth/resource";

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
    auth
});

const progressStack = backend.createStack('ProgressStack');

const progressApi = createProgress(progressStack);

backend.addOutput({
    custom: {
        progressApi
    },
});
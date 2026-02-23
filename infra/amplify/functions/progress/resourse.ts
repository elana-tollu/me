import { defineFunction } from '@aws-amplify/backend';

export const progressLambda = defineFunction({
    // optionally specify a name for the Function (defaults to directory name)
    name: 'progress',
    // optionally specify a path to your handler (defaults to "./handler.ts")
    entry: '../../../lambdas/progress/dist/handler.js',
    memoryMB: 128,
    runtime: 24
});
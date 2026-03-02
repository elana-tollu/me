import {defineAuth, secret} from '@aws-amplify/backend';

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
    loginWith: {
        email: true,
        externalProviders: {
            google: {
                clientId: secret('googleClientId'),
                clientSecret: secret('googleClientSecret'),
                scopes: ['openid', 'email', 'profile'],
                attributeMapping: {
                    email: 'email'
                }
            },
            callbackUrls: [
                'http://localhost:4322/me'
            ],
            logoutUrls: [
                'http://localhost:4322',
            ]
        },
    },
});

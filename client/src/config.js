// should be checked in the console after deploying serverless file!!!
const apiId = '';
export const apiEndpoint = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`;

// should be taken from Auth0 web
export const authConfig = {
    domain: '', // Auth0 domain
    clientId: '', // Auth0 client id
    callbackUrl: 'http://localhost:3000/callback',
};

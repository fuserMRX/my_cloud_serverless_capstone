# Serverless React Would You Rather App

## Functionality of the application

- This application will allow create/remove/fetch Users and Questions information.
- User's avatar can be modified and a new avatar can be uploaded.
- Each user per login has access to delete his own poll and see his own answered questions, avatar and email.

![serverless-react-would-app](https://img.shields.io/badge/build--1.0.0-serverless--react--would--app-green)

### Additional features

*`jwks-rsa` library **[JWKS-RSA](https://www.npmjs.com/package/jwks-rsa)** 🔥 was used to retrieve signing keys from a JWKS(JSON Web Key Set) endpoint
*`serverless-express` library **[SERVERLESS-EXPRESS](https://www.npmjs.com/package/@vendia/serverless-express)** ✨ was used  instead of `middy` in order to simplify development process and use node.js express endpoints
*`nodejs version` = **v16.18.1**

### Installation insturctions for the front-end

- **yarn install**
- `node version` should not be more than **v16.18.1**
- **npm run watch**

# Pigeon

## Setup

`npm install`

### Config

Some environment variables must be set. See `src/config.js`.

```
TOPIC_ARN
SUBSCRIPTION_ARN
```

### Developing

This will start the server with babel-node and nodemon.

`npm run start-dev`

### Production

This will transpile Pigeon to ES5 and run that version.

```
npm run build
npm start
```

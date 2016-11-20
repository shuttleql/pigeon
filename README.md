# Pigeon

## Setup

`npm install`

### Config

Some environment variables must be set. See `src/config.js`.

```
TOPIC_ARN ("arn:aws:sns:us-west-2:796325253416:AdminNotifications")
SUBSCRIPTION_ARN
```

To get `SUBSCRIPTION_ARN`, follow these steps:

- Install ngrok with `brew cask install ngrok`
- Run the pigeon server
- Run `ngrok http 9001` to expose a tunnel to Pigeon's HTTP interface
- Run `ngrok http 9002` to expose a tunnel to Pigeon's Socket interface (note this url for the next step)
- Set `PIGEON_SOCKET_URL` in admin-frontend and player-frontend
- Subscribe endpoint to Amazon SNS (ask @clemmy for help here)
- Resend the subscription request through Amazon SNS console, and hit the URL that is logged (ask @clemmy for help here)

### Developing

This will start the server with babel-node and nodemon.

`npm run start-dev`

### Production

This will transpile Pigeon to ES5 and run that version.

```
npm run build
npm start
```

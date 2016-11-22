import express from 'express';
import Socket from '../socket';
import config from '../config';

const router = express.Router();

router.get('/', (req, res) => {
  res.send({message: 'Chirp chirp'});
});

router.post('/adminNotifications', authenticateSns, (req, res, next) => {
  const subject = req.body.Subject;
  const message = JSON.parse(req.body.Message);
  const timestamp = new Date(req.body.Timestamp);

  console.log({
    subject, message, timestamp
  });

  switch (subject) {
    case 'update':
      Socket.emit(subject, {
        resource: message.resource
      });
      break;
    case 'announcement':
      Socket.emit(subject, {
        message: message.message
      });
  }

  res.status(200).end();
});

// middleware to ensure that requests are coming from Amazon
function authenticateSns(req, res, next) {
  req.body = JSON.parse(req.body);

  if (req.body.Type === 'SubscriptionConfirmation') {
    console.log('SubscribeURL: ', req.body.SubscribeURL);
    return res.status(200).end();
  }

  if (req.headers['x-amz-sns-subscription-arn'] === config.subscriptionArn && req.headers['x-amz-sns-topic-arn'] === config.topicArn) {
    next();
  } else {
    console.log(req.headers);
    next(new Error('SNS Authentication failed'));
  }
}

export default router;

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _socket = require('../socket');

var _socket2 = _interopRequireDefault(_socket);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var router = _express2['default'].Router();

router.get('/', function (req, res) {
  res.send({ message: 'Chirp chirp' });
});

router.post('/adminNotifications', authenticateSns, function (req, res, next) {
  var subject = req.body.Subject;
  var message = JSON.parse(req.body.Message);
  var timestamp = new Date(req.body.Timestamp);

  console.log({
    subject: subject, message: message, timestamp: timestamp
  });

  _socket2['default'].emit(subject, {
    resource: message.resource
  });

  res.status(200).end();
});

// middleware to ensure that requests are coming from Amazon
function authenticateSns(req, res, next) {
  req.body = JSON.parse(req.body);

  if (req.body.Type === 'SubscriptionConfirmation') {
    console.log('SubscribeURL: ', req.body.SubscribeURL);
    return res.status(200).end();
  }

  if (req.headers['x-amz-sns-subscription-arn'] === _config2['default'].subscriptionArn && req.headers['x-amz-sns-topic-arn'] === _config2['default'].topicArn) {
    next();
  } else {
    console.log(req.headers);
    next(new Error('SNS Authentication failed'));
  }
}

exports['default'] = router;
module.exports = exports['default'];
//# sourceMappingURL=index.js.map
# flowroute-sms

Send SMS messages using Flowroute's v2 Messaging API.

## Features

  * Allows sending SMS messages with Flowroute and Nodejs
  * Super-lightweight compared to scaffolded Flowroute SDK for Nodejs
  * Supported as standard installable npm module
  * Methods return ES6 Promises

## Installation

    npm install flowroute-sms

## Configuration

There are two ways to configure the client: environment variables, or passing
credentials when the client is instantiated. The values for access key and
secret key can be found in the
[Flowroute Manager](https://manage.flowroute.com/accounts/preferences/api/).

#### Environment Variables

  * `FLOWROUTE_KEY` - your Flowroute Access Key
  * `FLOWROUTE_SECRET` - your Flowroute Secret Key

If these environment variables are set, the client can be instantiated
without specifying any values (see following section).

## Create client

```
var FlowrouteSMS = require('flowroute-sms');
var client = new FlowrouteSMS(accessKey,secretKey);
```

The `new` keyword is optional. So, this could be shortened as:

```
var SMS = require('flowroute-sms')(accessKey,secretKey);
```

## Send message

```
var from = '18185551234';
var to   = '12135559090';

client.send(to, from, 'Hello World!')
.then(function(result){
    console.log('Sent message',result.id);
});
```

Note that `send` (and other methods) return an ES6 Promise.

## Lookup message

Fetch information for a single message ID.

```
client.lookup('mdr1-a6abeaedcafe4bd79841c5477b65fcba')
.then(function(result){
    console.log(result);
});
```

If successful, this will return an object:

```
{
  "attributes": {
    "body": "The eagle has landed.",
    "direction": "outbound",
    "timestamp": "2016-06-04T07:14:00.538022+00:00",
    "amount_nanodollars": 4000000,
    "from": "18185551234",
    "message_encoding": 0,
    "has_mms": false,
    "to": "12135559999",
    "amount_display": "$0.0040",
    "callback_url": null,
    "message_type": "long-code"
  },
  "type": "message",
  "id": "mdr1-a6abeaedcafe4bd79841c5477b65fcba"
}
```

## Search range of messages

```
var start = '2016-06-03';
var end = new Date();
var limit = 10;
var offset = 0;

client.search(start,end,limit,offset)
.then(function(results){
    console.log(results);
});
```

If successful, this method will return an array of message objects in the
format returned by the `lookup` method.

**Notes:** As per
[the documentation](https://developer.flowroute.com/docs/lookup-a-set-of-messages),
`start` and `end` parameters can be strings in the following formats: `YYYY-MM-DD`,
an ISO8601-style date like `YYYY-MM-DDTHH:mm:ss.SSZ`, or a Javascript `Date` object.
`limit` is optional and defaults to 250. `offset` is optional and defaults to zero.

## To Dos

  * Remove `request` dependency (could be implemented with native nodejs libraries)


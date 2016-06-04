# flowroute-sms

Send SMS messages using Flowroute's v2 Messaging API.

### Features

  * Allows sending SMS messages with Flowroute and Nodejs
  * Super-lightweight compared to scaffolded Flowroute SDK for Nodejs
  * Supported as standard installable npm module

### Installation

    npm install flowroute-sms

### Configuration

There are two ways to configure the client: environment variables, or passing
credentials when the client is instantiated. The values for access key and
secret key can be found in the
[Flowroute Manager](https://manage.flowroute.com/accounts/preferences/api/).

##### Environment Variables

  * `FLOWROUTE_KEY` - your Flowroute Access Key
  * `FLOWROUTE_SECRET` - your Flowroute Secret Key

If these environment variables are set, the client can be instantiated
without specifying any values (see following section).

### Create client

```
var FlowrouteSMS = require('flowroute-sms');
var client = new FlowrouteSMS(accessKey,secretKey);
```

### Send message

```
var from = '18185551234';
var to   = '12135559090';

client.send(from, to, 'Mrs Miller wants the entire house repainted.')
  .then(function(result){ console.log(result); })
  .catch(function(err){ console.error(err); });
```

Note that the `send` method returns an ES6 Promise.

### To Dos

  * Support additional methods for getting message detail records (very soon)
  * Remove `request` dependency (could be implemented with native nodejs libraries)


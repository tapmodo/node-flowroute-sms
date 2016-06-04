const request = require('request');

var Client = function(accessKey,secretKey){
  if (!(this instanceof Client)) return new Client(accessKey,secretKey);
  this.accessKey = accessKey || Client.accessKey;
  this.secretKey = secretKey || Client.secretKey;
}

Client.prototype = {
  send: function(to,from,body){
    var that = this;
    return new Promise(function(resolve,reject){
      if (!that.accessKey) throw 'Flowroute accessKey not defined';
      if (!that.secretKey) throw 'Flowroute secretKey not defined';
      request.post(
        'https://api.flowroute.com/v2/messages',
        {
          auth: { user: that.accessKey, pass: that.secretKey },
          body: { to: to, from: from, body: body },
          json: true
        },
        function(err,resp,body){
          if (err) reject(err);
          else resolve(body);
        }
      );
    });
  }
};

Client.accessKey = process.env.FLOWROUTE_KEY || null;
Client.secretKey = process.env.FLOWROUTE_SECRET || null;

module.exports = Client;

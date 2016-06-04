const request = require('request');
const qs = require('querystring');

var Client = function(accessKey,secretKey){
  if (!(this instanceof Client)) return new Client(accessKey,secretKey);
  this.accessKey = accessKey || Client.accessKey;
  this.secretKey = secretKey || Client.secretKey;
  this.limit = Client.limit;
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
          else resolve(body.data ? body.data: body);
        }
      );
    });
  },
  lookup: function(record_id){
    var that = this;
    return new Promise(function(resolve,reject){
      if (!that.accessKey) throw 'Flowroute accessKey not defined';
      if (!that.secretKey) throw 'Flowroute secretKey not defined';
      request.get(
        'https://api.flowroute.com/v2/messages/'+
          encodeURIComponent(record_id),
        {
          auth: { user: that.accessKey, pass: that.secretKey },
          json: true
        },
        function(err,resp,body){
          if (err) reject(err);
          else resolve(body.data ? body.data: body);
        }
      );
    });
  },
  search: function(start,end,limit,offset){
    var that = this;
    limit = limit || that.limit;
    offset = offset || 0;
    return new Promise(function(resolve,reject){
      if (!that.accessKey) throw 'Flowroute accessKey not defined';
      if (!that.secretKey) throw 'Flowroute secretKey not defined';
      request.get(
        'https://api.flowroute.com/v2/messages?'+
          qs.stringify({
            start_date: that.parseDate(start),
            end_date: that.parseDate(end),
            limit: limit,
            offset: offset
          }),
        {
          auth: { user: that.accessKey, pass: that.secretKey },
          json: true
        },
        function(err,resp,body){
          if (err) reject(err);
          else resolve(body.data ? body.data: body);
        }
      );
    });
  },
  parseDate: function(date){
    if (date instanceof Date) return date.toISOString();
    return date;
  }
};

Client.accessKey = process.env.FLOWROUTE_KEY || null;
Client.secretKey = process.env.FLOWROUTE_SECRET || null;
Client.limit = 250;

module.exports = Client;

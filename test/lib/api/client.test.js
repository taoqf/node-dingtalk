'use strict';

const assert = require('power-assert');

const DingTalk = require('../../../dist/dingtalk');
const options = require('./../../fixtures/test.config.json');

describe('test/dist/api/client.test.js', () => {
  let dingtalk;

  before(function* () {
    dingtalk = new DingTalk(options);
  });

  it('getAccessToken', function* () {
    const token = yield dingtalk.client.getAccessToken();
    const expireTime = dingtalk.client.accessTokenExpireTime;
    assert(token);
    assert(expireTime >= Date.now());

    const token2 = yield dingtalk.client.getAccessToken();
    assert(token === token2);
    assert(expireTime === dingtalk.client.accessTokenExpireTime);
  });

  it('getJSApiTicket', function* () {
    const token = yield dingtalk.client.getJSApiTicket();
    const expireTime = dingtalk.client.jsapiTicketExpireTime;
    assert(token);
    assert(expireTime >= Date.now());

    const token2 = yield dingtalk.client.getJSApiTicket();
    assert(token === token2);
    assert(expireTime === dingtalk.client.jsapiTicketExpireTime);
  });

  it('normalizeUrl', () => {
    const mapping = [
      {
        src: 'http://localhost:5000/test',
        target: 'http://localhost:5000/test',
      },
      {
        src: 'http://localhost:5000/test#top',
        target: 'http://localhost:5000/test',
      },
      {
        src: 'http://localhost:5000/test?url=http%3A%2F%2Fabc.com%2Fsomewhere#top',
        target: 'http://localhost:5000/test?url=http://abc.com/somewhere',
      },
      {
        src: 'http://localhost:5000/test?a=b&url=http%3A%2F%2Fabc.com%2Fsomewhere#top',
        target: 'http://localhost:5000/test?a=b&url=http://abc.com/somewhere',
      },
    ];
    for (const item of mapping) {
      assert(dingtalk.client._normalizeUrl(item.src) === item.target);
    }
  });

  it('getJSApiConfig', function* () {
    const opts = {
      jsapi_ticket: 'HerLBdXanXEE9D78HR1IutOlhOXkFWMKZThJ5bX35HSJA5s8jZUaKWQT7rauior2qyqLMehYaoA9iCemhUBVDD',
      noncestr: 'DingTalk#1470295596107',
      timestamp: 1470295596107,
    };
    const cfg = yield dingtalk.client.getJSApiConfig('http://localhost:5000/?url=http%3A%2F%2Fabc.com%2Fsomewhere#top', opts);
    assert(cfg.corpId === options.corpid);
    assert(cfg.timeStamp === opts.timestamp);
    assert(cfg.nonceStr === opts.noncestr);
    assert(cfg.signature === 'd392648b027b8f6ce13dc89db8b1a86c94764fae');
  });
});

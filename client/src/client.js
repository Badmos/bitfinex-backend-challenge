'use strict'

const { PeerRPCClient }  = require('grenache-nodejs-http')
const Link = require('grenache-nodejs-link');
const { orderBookPayload } = require('../../data');

const GRAPE_URL = process.env.GRAPE_URL || 'http://127.0.0.1:30001'

const link = new Link({
  grape: GRAPE_URL
});


link.start()

const peer = new PeerRPCClient(link, {})
peer.init();

peer.request('bitfinex_backend_challenge', orderBookPayload, { timeout: 10000 }, (err, response) => {
  if (err) {
    console.error(err)
    process.exit(-1)
  }

  console.log(`Order sent with payload ${orderBookPayload}`)

  console.log(`====> Response gotten from server as: ${response}`)

})
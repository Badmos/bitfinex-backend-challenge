'use strict'

const { PeerRPCServer }  = require('grenache-nodejs-http')
const Link = require('grenache-nodejs-link')
const { MatchingEngine } = require('./matching-engine')

function getOrderBook(orderBook) {
  const orderInstance = new MatchingEngine(orderBook)

  return orderInstance;
}

const grapeUrl = process.env.GRAPE_URL || 'http://127.0.0.1:30001'
const timeout = process.env.TIMEOUT || 300000

const link = new Link({
  grape: grapeUrl
})
link.start()

const peer = new PeerRPCServer(link, {
  timeout
})
peer.init()

const port = 1024 + Math.floor(Math.random() * 1000)
const service = peer.transport('server')
service.listen(port)

setInterval(function () {
  link.announce('distributed_exchange', service.port, {})
}, 1000)

service.on('request', (rid, key, payload, handler) => {
  const order = getOrderBook(payload);

  const processedOrder = order.process(payload.buyOrders[2]);

  console.log('ProcessedOrder', processedOrder)

  handler.reply(null, processedOrder)
})

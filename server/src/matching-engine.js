/**
 * This class utilizes methods for both the buy and sell side of the market. The methods are quite similar except the side of the market the operate on. 
 * The algorithm used in matching is as follows: We match a buy order with any sell order that lists sells at a price higher or equal to the price of our order.
 * When this condition is no longer valid or the order is fully filled, we return the trades matched.
 */

class MatchingEngine {
    constructor(orderBook) {
        this.orderBook = orderBook;
    }

    // Add Buy order to the order book
    addBuyOrder(order) {
        const buyOrders = this.orderBook.buyOrders;

        const buyOrdersLength = buyOrders.length;

        for(let i = buyOrdersLength - 1; i >=0; i--) {
            const buyOrder = buyOrders[i];

            if(buyOrder.price < order.price) {
                break;
            }

            if(i === buyOrdersLength - 1) {
                this.orderBook.buyOrders.push(order)
            } else {
                // Create a copy of array from i through end.
                const buyOrdersPartial = this.orderBook.buyOrders.slice(i)

                this.orderBook.buyOrders.splice(i+1, buyOrdersPartial.length, ...buyOrdersPartial)

                this.orderBook.buyOrders[i+1]
                this.orderBook.buyOrders[i] = order
            }

        }
    }

    // Add a sell order to the order book
    addSellOrder(order) {
        const sellOrders = this.orderBook.sellOrders;

        const sellOrdersLength = sellOrders.length;

        for(let i = sellOrdersLength - 1; i >=0; i--) {
            const sellOrder = sellOrders[i];

            if(sellOrder.price < order.price) {
                break;
            }

            if(i === sellOrdersLength - 1) {
                this.orderBook.sellOrders.push(order)
            } else {
                const sellOrdersPartial = this.orderBook.sellOrders.slice(i)

                this.orderBook.sellOrders.splice(i+1, sellOrdersPartial.length, ...sellOrdersPartial)

                this.orderBook.sellOrders[i+1]
                this.orderBook.sellOrders[i] = order
            }

        }
    }

    // Remove a buy order (one entry only) from the order book for a given orderId
    removeBuyOrder(orderId) {
        const filteredBuyOrders = this.orderBook.buyOrders.filter(buyOrder => buyOrder.orderId !== orderId)

        this.orderBook.buyOrders = filteredBuyOrders
    }

    // Remove a sell order (one entry only) from the order book at a given index
    removeSellOrder(orderId) {
        const filteredSellOrders = this.orderBook.sellOrders.filter(sellOrder => sellOrder.orderId !== orderId)

        this.orderBook.sellOrders = filteredSellOrders
    }

    // Process an order and return the trades generated before adding the remaining amount to the market
    process(order) {
        if(order.side === 1) {
            return this.processLimitBuy(order)
        }

        return this.processLimitSell(order)
    }

    // Process a limit buy order
    processLimitBuy(order) {
        const trades = [];

        const sellOrdersLength = this.orderBook.sellOrders.length;

        // Check if at least one matching order exists
        if(sellOrdersLength !== 0 || this.orderBook.sellOrders[sellOrdersLength - 1].price <= order.price) {

            // iterate through all matching orders
            for(let i = sellOrdersLength - 1; i >= 0; i--) {
                const sellOrder = this.orderBook.sellOrders[i]

                if(sellOrder.price > order.price) {
                    break;
                }

                // fill entire order
                if(sellOrder.amount >= order.amount) {
                    trades.push({ takerOrderId: order.orderId, makerOrderId: sellOrder.orderId, amount: order.amount, price: sellOrder.price });

                    sellOrder.amount = sellOrder.amount - order.amount

                    if(sellOrder.amount === 0) {
                        this.removeSellOrder(sellOrder.orderId)
                    }

                    return trades;
                }

                // fill a partial order and continue through iteration
                if(sellOrder.amount < order.amount) {
                    trades.push({ takerOrderId: order.orderId, makerOrderId: sellOrder.orderId, amount: sellOrder.amount, price: sellOrder.price });

                    order.amount = order.amount - sellOrder.amount

                    this.removeSellOrder(sellOrder.orderId);

                    continue;
                }

                
            }
        }

        // We then add the remaining order to the list
        this.addBuyOrder(order);

        return trades;
    }

    // Process a limit sell order
    processLimitSell(order) {
        const trades = [];

        const buyOrdersLength = this.orderBook.buyOrders.length;

        // Check if at least one matching order exists
        if(buyOrdersLength !== 0 || this.orderBook.buyOrders[buyOrdersLength - 1].price <= order.price) {

            // iterate through all matching orders
            for(let i = buyOrdersLength - 1; i >= 0; i--) {
                const buyOrder = this.orderBook.buyOrders[i]

                if(buyOrder.price > order.price) {
                    break;
                }

                // fill entire order
                if(buyOrder.amount >= order.amount) {
                    trades.push({ takerOrderId: order.orderId, makerOrderId: buyOrder.orderId, amount: order.amount, price: buyOrder.price });

                    buyOrder.amount = buyOrder.amount - order.amount

                    if(buyOrder.amount === 0) {
                        this.removeBuyOrder(buyOrder.orderId)
                    }

                    return trades;
                }

                // fill a partial order and continue through iteration
                if(buyOrder.amount < order.amount) {
                    trades.push({ takerOrderId: order.orderId, makerOrderId: buyOrder.orderId, amount: buyOrder.amount, price: buyOrder.price });

                    order.amount = order.amount - buyOrder.amount;

                    this.removeBuyOrder(buyOrder.orderId);

                    continue;
                }

                
            }
        }

        // We then add the remaining order to the list
        this.addSellOrder(order);

        return trades;
    }
}


module.exports.MatchingEngine = MatchingEngine;
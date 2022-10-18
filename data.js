const buyOrders = [
    {
        amount: 5000,
        price: 734,
        side: 1,
        orderId: 'lkmd'
    },
    {
        amount: 3929,
        price: 43,
        side: 1,
        orderId: 'iguy'
    },
    {
        amount: 9832,
        price: 894,
        side: 1,
        orderId: 'skld'
    },
    {
        amount: 923,
        price: 45,
        side: 1,
        orderId: 'uspi'
    }
]

const sellOrders = [
    {
        amount: 5000,
        price: 734,
        side: 0,
        orderId: 'ajkn'
    },
    {
        amount: 3929,
        price: 43,
        side: 0,
        orderId: 'kmns'
    },
    {
        amount: 76192,
        price: 894,
        side: 0,
        orderId: 'nxcs'
    },
    {
        amount: 632,
        price: 45,
        side: 0,
        orderId: 'bcds'
    }
]

const orderBookPayload = {
    buyOrders,
    sellOrders,
}

module.exports.orderBookPayload = orderBookPayload;
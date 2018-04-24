const handleDelivery = (req, res, db) => {
    
//    db.select('*').from('orders')
//        .whereIn('status', 'no')
//        .then(orders => {
//            res.json(orders);
//        })
//        .catch(err => res.status(400).json(err))
    
    db.transaction(trx => {
        trx.select('*').from('orders')
        .join('customers', 'orders.c_id', '=', 'customers.c_id')
        .join('customer_addr', 'customers.c_id', '=', 'customer_addr.c_id')
        .then(addr => {
            res.json(addr);
        })
        .then(trx.commit)
        .catch(trx.rollback)
    }).catch(err => res.status(400).json(err))
    
}

module.exports = {
    handleDelivery: handleDelivery
}
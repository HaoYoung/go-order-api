const handleDelivery = (req, res, db) => {
    
    db.transaction(trx => {
        trx.select('*').from('orders')
        .join('customers', 'orders.c_id', '=', 'customers.c_id')
        .join('customer_addr', 'customers.c_id', '=', 'customer_addr.c_id')
        .join('restaurants', 'orders.r_id', '=', 'restaurants.r_id')
        .join('restaurant_addr', 'orders.r_id', '=', 'restaurant_addr.r_id')
        .where('status', '=', 'wait')
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
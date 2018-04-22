const handleDelivery = (req, res, db) => {
    
    db.select('*').from('orders')
        .whereIn('status', 'no')
        .then(orders => {
            res.json(orders);
        })
        .catch(err => res.status(400).json(err))
    
}

module.exports = {
    handleDelivery: handleDelivery
}
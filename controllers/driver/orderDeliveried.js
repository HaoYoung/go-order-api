const handleOrderDeliveried = (req, res, db) => {
    
    const { order_id, d_id } = req.body;
    
    // cannot be empty
    if ( !order_id || !d_id ){ 
        return res.status(400).json('incorrect form submission');
    }
    
    
    db('orders').where('order_id', '=', order_id)
        .update({
          d_id: d_id,
          status: 'deliveried'
        })
        .then(() => {
            db('orders').select('*')
            .join('customers', 'orders.c_id', '=', 'customers.c_id')
            .join('customer_addr', 'customers.c_id', '=', 'customer_addr.c_id')
            .join('restaurants', 'orders.r_id', '=', 'restaurants.r_id')
            .join('restaurant_addr', 'orders.r_id', '=', 'restaurant_addr.r_id')
            .where('status', '=', 'wait')
            .then(order => {
                res.json(order);
            })
            .catch(err => res.status(400).json(err))
        })
        .catch(err => res.status(400).json('unable to delivery order'))
}

module.exports = {
    handleOrderDeliveried: handleOrderDeliveried
};
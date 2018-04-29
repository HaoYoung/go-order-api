const handlePlaceOrder = (req, res, db) => {
    // customer-id, restaurant-id, order dish details from request
    const { c_id, r_id, order_content } = req.body;
    
    // cannot be empty
    if ( !c_id || !r_id || !order_content ){ 
        return res.status(400).json('incorrect form submission');
    }
    
    db('orders').insert({
        c_id: c_id,
        r_id: r_id,
        order_content: JSON.stringify(order_content),
        regdate: new Date(),
        status: 'wait'
    })
    .returning(['order_id', 'c_id', 'r_id', 'order_content', 'delivery_fee', 'tips', 'regdate', 'status'])
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json(err))
}

module.exports = {
    handlePlaceOrder: handlePlaceOrder
};
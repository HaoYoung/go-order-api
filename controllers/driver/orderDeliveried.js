const handleOrderDeliveried = (req, res, db) => {
    // fname, lname, email, phone, password from request
    const { order_id, d_id } = req.body;
    
    // cannot be empty
    if ( !order_id || !d_id ){ 
        return res.status(400).json('incorrect form submission');
    }
    
    // insert data into login table and customer table
    db('orders').where('item_id', '=', item_id)
        .update({
          d_id: d_id,
          status: 'deliveried'
        })
        .then(order => {
            res.json(order[0]);
        })
        .catch(err => res.status(400).json('unable to delivery order'))
}

module.exports = {
    handleOrderDeliveried: handleOrderDeliveried
};
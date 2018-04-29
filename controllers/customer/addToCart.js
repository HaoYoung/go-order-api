const handleAddToCart = (req, res, db) => {
    // customer-id, restaurant-id, dish-id, dish quantity from request
    const { c_id, r_id, dish_id, quantity } = req.body;
    
    // cannot be empty
    if ( !c_id || !r_id || !dish_id || !quantity ){ 
        return res.status(400).json('incorrect form submission');
    }
    
    db.select('quantity').from('shopping_cart')
        .where({c_id: c_id, dish_id: dish_id})
        .then(item => {
            if (item.length){
                //Update
                 db('shopping_cart').where({c_id: c_id, dish_id: dish_id})
                .update({
                  quantity: quantity
                })
                .then(() => {
                    db.select('*').from('shopping_cart')
                        .join('dishes', 'dishes.id', '=', 'shopping_cart.dish_id')
                        .where('c_id', '=', c_id)
                        .then(totalItems => {
                            if (totalItems.length){
                                res.json(totalItems);
                            } else {
                                res.status(400).json([]);
                            }
                        })
                        .catch(err => res.status(400).json('Error getting shopping cart'))
                })
            } else {
                //Insert
                db('shopping_cart').insert({
                    c_id: c_id,
                    r_id: r_id,
                    dish_id: dish_id,
                    quantity: quantity
                })
                .then(() => {
                    db.select('*').from('shopping_cart')
                        .join('dishes', 'dishes.id', '=', 'shopping_cart.dish_id')
                        .where('c_id', '=', c_id)
                        .then(totalItems => {
                            if (totalItems.length){
                                res.json(totalItems);
                            } else {
                                res.status(400).json([]);
                            }
                        })
                        .catch(err => res.status(400).json('Error getting shopping cart'))
                })
            }
        })
        .catch(err => res.status(400).json(err))
    

    
}

module.exports = {
    handleAddToCart: handleAddToCart
};
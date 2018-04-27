const handleAddToCart = (req, res, db) => {
    // restaurant-id, name, dish-category, price, img-url from request
    const { c_id, r_id, dish_id, quantity } = req.body;
    
    // cannot be empty
    if ( !r_id || !r_id || !dish_id || !quantity ){ 
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
//                .returning(['item_id', 'c_id', 'r_id', 'dish_id', 'quantity'])
//                .then(new_item => {
//                    res.json(new_item[0]);
//                })
//                .catch(err => res.status(400).json(err))
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
                                res.status(400).json(null);
                            }
                        })
                        .catch(err => res.status(400).json('Error getting shopping cart'))
                })
//                .returning(['item_id', 'c_id', 'r_id', 'dish_id', 'quantity'])
//                .then(data => { res.json(data) })
//                .catch(err => res.status(400).json(err))
            }
        })
        .catch(err => res.status(400).json(err))
    

    
}

module.exports = {
    handleAddToCart: handleAddToCart
};
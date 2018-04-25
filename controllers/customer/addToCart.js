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
                 db('shopping_cart').where(item_id, '=', item[0].item_id)
                .update({
                  quantity: quantity
                })
                .then(new_item => {
                    res.json(new_item[0]);
                })
                .catch(err => res.status(400).json(err))
            } else {
                //Insert
                db('shopping_cart').insert({
                    c_id: c_id,
                    r_id: r_id,
                    dish_id: dish_id,
                    quantity: quantity
                })
                .returning(['item_id', 'c_id', 'r_id', 'dish_id', 'quantity'])
                .then(data => { res.json(data) })
                .catch(err => res.status(400).json(err))
            }
        })
        .catch(err => res.status(400).json(err))
    
}

module.exports = {
    handleAddToCart: handleAddToCart
};
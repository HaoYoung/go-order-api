const handleRemoveFromCart = (req, res, db) => {
    
    const { item_id } = req.body;
    
    db('shopping_cart')
    .where('item_id', item_id)
    .del()
    .then( () => {
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
}

module.exports = {
    handleRemoveFromCart: handleRemoveFromCart
};


const handleGetCart = (req, res, db) => {
    const { id } = req.params;
    db.select('*').from('shopping_cart')
        .join('dishes', 'id', '=', 'dish_id')
        .where('c_id', '=', id)
        .then(items => {
            if (items.length){
                res.json(items);
            } else {
                res.status(400).json(null);
            }
        })
        .catch(err => res.status(400).json('Error getting shopping cart'))
}

module.exports = {
    handleGetCart: handleGetCart
}
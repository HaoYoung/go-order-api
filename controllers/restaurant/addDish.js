const handleAddDish = (req, res, db) => {
    // restaurant-id, name, dish-category, price, img-url from request
    const { r_id, name, category, price, url } = req.body;
    
    // cannot be empty
    if ( !r_id || !name || !category || !price ){ 
        return res.status(400).json('incorrect form submission');
    }
    
    // insert data into dishes table 
    db.transaction(trx => {
        trx.insert({
            r_id: r_id,
            name: name,
            category: category,
            price: price,
            url:url
        })
        .into('dishes')
        .returning(['id', 'r_id', 'name', 'category', 'price', 'url'])
        .then(data => {
            res.json(data);
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('Unable to add dish'))
}

module.exports = {
    handleAddDish: handleAddDish
};
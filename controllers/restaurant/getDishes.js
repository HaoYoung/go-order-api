const handleGetDishes = (req, res, db) => {
    const { id } = req.params;
    db.select('*').from('dishes')
        .where('r_id', '=', id)
        .then(dishes => {
            if (dishes.length){
                res.json(dishes);
            } else {
                res.status(400).json('Not found');
            }
        })
        .catch(err => res.status(400).json('Error getting dishes'))
}

module.exports = {
    handleGetDishes: handleGetDishes
}
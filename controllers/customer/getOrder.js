const handleGetOrder = (req, res, db) => {
    const { id } = req.params;
    db.select('*').from('orders')
        .where('c_id', '=', id)
        .then(items => {
            if (items.length){
                res.json(items);
            } else {
                res.status(400).json(null);
            }
        })
        .catch(err => res.status(400).json('Error getting history orders'))
}

module.exports = {
    handleGetOrder: handleGetOrder
}
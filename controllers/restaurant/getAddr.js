const handleGetAddr = (req, res, db) => {
    const { id } = req.params;
    db.select('*').from('restaurant_addr')
        .where('r_id', '=', id)
        .then(address => {
            if (address.length){
                res.json(address[0]);
            } else {
                res.status(400).json('Not found');
            }
        })
        .catch(err => res.status(400).json('Error getting address'))
}

module.exports = {
    handleGetAddr: handleGetAddr
}
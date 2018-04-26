const handleGetRAddr = (req, res, db) => {
    
    db.select('*').from('restaurant_addr')
        .join('restaurants', 'r_id', '=', 'r_id')
        .then(address => {
            if (address.length){
                res.json(address);
            } else {
                res.status(400).json('Not found');
            }
        })
        .catch(err => res.status(400).json('Error getting all restaurants address'))
}

module.exports = {
    handleGetRAddr: handleGetRAddr
}
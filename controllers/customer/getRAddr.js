const handleGetRAddr = (req, res, db) => {
    
    db.select('*').from('restaurant_addr')
        .join('restaurants', 'restaurants.r_id', '=', 'restaurant_addr.r_id')
        .then(address => {
            if (address.length){
                res.json(address);
            } else {
                res.status(400).json('Not found');
            }
        })
        .catch(err => res.status(400).json(err))
}

module.exports = {
    handleGetRAddr: handleGetRAddr
}
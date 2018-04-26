const handleGetRAddr = (req, res, db) => {
    
    db.select('*').from('restaurant_addr')
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
    handleGetRAddr: handleGetRAddr
}
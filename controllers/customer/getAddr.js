const handleGetAddr = (req, res, db) => {
    const { c_id } = req.params;
    db.select('*').from('customer_addr')
        .where('c_id', '=', c_id)
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
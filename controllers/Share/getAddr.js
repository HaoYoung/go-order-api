const handleGetAddr = (req, res, db) => {
    const { email } = req.body;
    db.select('*').from('address')
        .where('email', '=', email)
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
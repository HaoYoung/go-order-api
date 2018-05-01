const handleAddAddr = (req, res, db) => {
    // fname, lname, email, phone, password from request
    const { c_id, c_street, c_suit, c_city, c_state, c_zip, c_longitude, c_latitude } = req.body;
    
    // cannot be empty
    if ( !c_id || !c_street || !c_city || !c_state || !c_zip ){ 
        return res.status(400).json('incorrect form submission');
    }
    
    // insert data into address table 
    db.transaction(trx => {
        trx.insert({
            c_id: c_id,
            c_street: c_street,
            c_suit: c_suit,
            c_city: c_city,
            c_state: c_state,
            c_zip: c_zip,
            c_longitude: c_longitude, 
            c_latitude: c_latitude
        })
        .into('customer_addr')
        .returning(['c_addr_id', 'c_id', 'c_street', 'c_suit', 'c_city', 'c_state', 'c_zip', 'c_longitude', 'c_latitude'])
        .then(data => {
            res.json(data);
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => res.status(400).json(err))
}

module.exports = {
    handleAddAddr: handleAddAddr
};
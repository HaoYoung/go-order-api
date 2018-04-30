const handleAddAddr = (req, res, db) => {
    // fname, lname, email, phone, password from request
    const { c_id, street, suit, city, state, zip, longitude, latitude } = req.body;
    
    // cannot be empty
    if ( !street || !city || !state || !zip ){ 
        return res.status(400).json('incorrect form submission');
    }
    
    // insert data into address table 
    db.transaction(trx => {
        trx.insert({
            c_id: c_id,
            c_street: street,
            c_suit: suit,
            c_city: city,
            c_state: state,
            c_zip: zip,
            c_longitude: longitude, 
            c_latitude: latitude
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
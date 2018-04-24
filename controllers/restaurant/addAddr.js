const handleAddAddr = (req, res, db) => {
    // fname, lname, email, phone, password from request
    const { id, street, suit, city, state, zip, longitude, latitude } = req.body;
    
    // cannot be empty
    if ( !street || !city || !state || !zip ){ 
        return res.status(400).json('incorrect form submission');
    }
    
    // insert data into address table 
    db.transaction(trx => {
        trx.insert({
            r_id: id,
            r_street: street,
            r_suit: suit,
            r_city: city,
            r_state: state,
            r_zip: zip,
            r_longitude: longitude, 
            r_latitude: latitude
        })
        .into('restaurant_addr')
        .returning(['r_addr_id', 'r_street', 'r_suit', 'r_city', 'r_state', 'r_zip', 'r_longitude', 'r_latitude'])
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
const handleAddAddr = (req, res, db) => {
    // fname, lname, email, phone, password from request
    const { login_id, street, suit, city, state, zip } = req.body;
    
    // cannot be empty
    if ( !login_id || !street || !city || !state || !zip ){ 
        return res.status(400).json('incorrect form submission');
    }
    
    // insert data into address table 
    //'id', 'login_id', 'street', 'suit', 'city', 'state', 'zip'
    db.transaction(trx => {
        trx.insert({
            login_id: login_id,
            street: street,
            suit: suit,
            city: city,
            state: state,
            zip: zip
        })
        .into('address')
        .returning([])
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
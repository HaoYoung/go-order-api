const handleAddAddr = (req, res, db) => {
    // fname, lname, email, phone, password from request
    const { email, street, suit, city, state, zip } = req.body;
    
    // cannot be empty
    if ( !email || !street || !city || !state || !zip ){ 
        return res.status(400).json('incorrect form submission');
    }
    
    // insert data into address table 
    db.transaction(trx => {
        trx.insert({
            email: email,
            street: street,
            suit: suit,
            city: city,
            state: state,
            zip: zip
        })
        .into('address')
        .returning(['id', 'email', 'street', 'suit', 'city', 'state', 'zip'])
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
const handleAddAddr = (req, res, db, bcrypt) => {
    // fname, lname, email, phone, password from request
    const { login_id, street, suit, city, state, zip } = req.body;
    
    // cannot be empty
    if ( !login_id || !street || !city || !state || !zip ){ 
        return res.status(400).json('incorrect form submission');
    }
    
    // insert data into address table 
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
        .then(data => {
            res.json(data);
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('Unable to add address'))
}

module.exports = {
    handleAddAddr: handleAddAddr
};
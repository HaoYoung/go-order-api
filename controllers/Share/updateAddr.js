const handleUpdateAddress = (req, res, db) => {
    // fname, lname, email, phone, password from request
    const { email, street, suit, city, state, zip } = req.body;
    
    // cannot be empty
    if ( !email || !street || !city || !state || !zip ){ 
        return res.status(400).json('incorrect form submission');
    }
    
    // update data into login table and address table
    db('address').where(email, '=', email)
        .update({
          street: street,
          suit: suit,
          city: city,
          state: state,
          zip: zip
        })
        .then(address => {
            res.json(address[0]);
        })
        .catch(err => res.status(400).json('unable to update address'))
}

module.exports = {
    handleUpdateAddress: handleUpdateAddress
};
const handleUpdateAddress = (req, res, db) => {
    // fname, lname, email, phone, password from request
    const { c_id, street, suit, city, state, zip, longitude, latitude } = req.body;
    
    // cannot be empty
    if ( !street || !city || !state || !zip ){ 
        return res.status(400).json('incorrect form submission');
    }
    
    // update data into login table and address table
    db('customer_addr').where(c_id, '=', c_id)
        .update({
          c_street: street,
          c_suit: suit,
          c_city: city,
          c_state: state,
          c_zip: zip,
          c_longitude: longitude, 
          c_latitude: latitude
        })
        .then(address => {
            res.json(address[0]);
        })
        .catch(err => res.status(400).json(err))
}

module.exports = {
    handleUpdateAddress: handleUpdateAddress
};
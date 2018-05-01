const handleUpdateAddress = (req, res, db) => {
    // fname, lname, email, phone, password from request
    const { c_id, c_street, c_suit, c_city, c_state, c_zip, c_longitude, c_latitude } = req.body;
    
    // cannot be empty
    if ( !c_street || !c_city || !c_state || !c_zip ){ 
        return res.status(400).json('incorrect form submission');
    }
    
    // update data into login table and address table
    db('customer_addr').where('c_id', '=', c_id)
        .update({
          c_street: c_street,
          c_suit: c_suit,
          c_city: c_city,
          c_state: c_state,
          c_zip: c_zip,
          c_longitude: c_longitude, 
          c_latitude: c_latitude
        })
        .then(address => {
            res.json(address[0]);
        })
        .catch(err => res.status(400).json(err))
}

module.exports = {
    handleUpdateAddress: handleUpdateAddress
};
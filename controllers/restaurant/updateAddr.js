const handleUpdateAddress = (req, res, db) => {
    // fname, lname, email, phone, password from request
    const { r_id, street, suit, city, state, zip, longitude, latitude } = req.body;
    
    // cannot be empty
    if ( !street || !city || !state || !zip ){ 
        return res.status(400).json('incorrect form submission');
    }
    
    // update data into login table and address table
    db('restaurant_addr').where('r_id', '=', r_id)
        .update({
          r_street: street,
          r_suit: suit,
          r_city: city,
          r_state: state,
          r_zip: zip,
          r_longitude: longitude, 
          r_latitude: latitude
        })
        .then( () => {
            db.select('*').from('restaurant_addr')
            .where('r_id', '=', r_id)
            .then(myAddress => {
                res.json(myAddress[0]);
            })
        })
        .catch(err => res.status(400).json(err))
}

module.exports = {
    handleUpdateAddress: handleUpdateAddress
};
const handleUpdateProfile = (req, res, db) => {
    // fname, lname, email, phone, password from request
    const { id, name, email, phone, imgurl, type } = req.body;
    
    // cannot be empty
    if ( !name || !email || !phone || !type ){ 
        return res.status(400).json('incorrect form submission');
    }
    
    // insert data into login table and customer table
    db('restaurants').where('id', '=', id)
        .update({
          name: name,
          email: email,
          phone: phone,
          imgurl: imgurl,
          type: type
        })
        .then(restaurant => {
            res.json(restaurant[0]);
        })
        .catch(err => res.status(400).json('unable to update restaurant'))
}

module.exports = {
    handleUpdateProfile: handleUpdateProfile
};
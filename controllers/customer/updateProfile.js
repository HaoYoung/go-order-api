const handleUpdateProfile = (req, res, db) => {
    // fname, lname, email, phone, password from request
    const { c_id, fname, lname, email, phone } = req.body;
    
    // cannot be empty
    if ( !id || !fname || !lname || !email || !phone ){ 
        return res.status(400).json('incorrect form submission');
    }
    
    // insert data into login table and customer table
    db('customers').where('c_id', '=', c_id)
        .update({
          fname: fname,
          lname: lname,
          email: email,
          phone: phone
        })
        .then(customer => {
            res.json(customer[0]);
        })
        .catch(err => res.status(400).json('unable to update customer'))
}

module.exports = {
    handleUpdateProfile: handleUpdateProfile
};
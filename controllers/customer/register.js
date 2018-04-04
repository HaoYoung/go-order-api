const handleRegister = (req, res, db, bcrypt) => {
    // fname, lname, email, phone, password from request
    const { fname, lname, email, phone, password } = req.body;
    
    // cannot be empty
    if ( !fname || !lname || !email || !phone || !password){ 
        return res.status(400).json('incorrect form submission');
    }
    
    // hash password
    const hash = bcrypt.hashSync(password);
    
    // insert data into login table and customer table
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('customers')
                .returning('*')
                .insert({
                    fname: fname,
                    lname: lname,
                    email: loginEmail[0],
                    phone: phone,
                    joined: new Date()
                })
                .then(customer => {
                    res.json(customer[0]);
                })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('Unable to register'))
}

module.exports = {
    handleRegister: handleRegister
};
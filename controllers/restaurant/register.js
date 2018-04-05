const handleRegister = (req, res, db, bcrypt) => {
    // fname, lname, email, phone, password from request
    const { name, email, phone,imgurl, type, password } = req.body;
    
    // cannot be empty
    if ( !name || !email || !phone || !type || !password){ 
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
            return trx('restaurants')
                .returning('*')
                .insert({
                    name: name,
                    email: loginEmail[0],
                    phone: phone,
                    imgurl: imgurl,
                    joined: new Date(),
                    type: type
                })
                .then(restaurant => {
                    res.json(restaurant[0]);
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
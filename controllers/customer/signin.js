const handleSignin = (req, res, db, bcrypt) => {
    // signin varables from request
    const { email, password } = req.body;
    
    // cannot be empty
    if (!email || !password){
        return res.status(400).json('incorrect form submission');
    }
    
    db.select('*').from('login')
        .where('email', '=', req.body.email)
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash);
            if (isValid) {
                db.select('*').from('customers')
                    .where('email', '=', email)
                    .then(customer => {
                        res.json(data[0])
                    })
                    .catch(err => res.status(400).json('unable to get customer'))
            } else {
                res.status(400).json('wrong credentials')
            }
        })
        .catch(err => res.status(400).json('wrong credentials'))
}

module.exports = {
    handleSignin: handleSignin
}
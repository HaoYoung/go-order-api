const handleSignin = (req, res, db, bcrypt) => {
    // signin varables from response
    const { email, password } = req.body;
    
    // cannot be empty
    if (!email || !password){
        return res.status(400).json('incorrect form submission');
    }
    
    db.select('email', 'hash').from('login')
        .where('email', '=', req.body.email)
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash);
            if (isValid) {
                db.select('*').from('drivers')
                    .where('email', '=', email)
                    .then(driver => {
                        res.json(driver[0])
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
const handleRests = (req, res, db) => {
    
    db.select('*').from('restaurants')
        .then(restaurants => {
            res.json(restaurants)
        })
        .catch(err => res.status(400).json('unable to get restaurants'))
}

module.exports = {
    handleSignin: handleRests
}
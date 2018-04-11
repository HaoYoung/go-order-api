const handleRests = (req, res, db) => {
    db.select('*').from('restaurants')
        .then(restaurants => {
            res.json(restaurants)
        })
        .catch(err => res.status(400).json('unable to get restaurants'))
}

const handleRestsList = (req, res, db) => {
    const { restTypes } = req.body;
    var rests = ['something ?'];
    
    if ( !restTypes ){
        return res.status(400).json('incorrect form submission');
    }
    
    restTypes.map((type) => {
        res.json(db.select('*').from('restaurants').where('type', type));
    })
}

module.exports = {
    handleRests: handleRests,
    handleRestsList: handleRestsList
}
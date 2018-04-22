const handleRests = (req, res, db) => {
    db.select('*').from('restaurants')
        .then(restaurants => {
            res.json(restaurants)
        })
        .catch(err => res.status(400).json('unable to get restaurants'))
}



const handleRestsList = (req, res, db) => {
    const { restTypes } = req.body;
    //var rests = [];
    
    if ( !restTypes ){
        return res.status(400).json('incorrect form submission');
    }
    
    db.select('*').from('restaurants')
            .whereIn('type', restTypes)
            .then(restaurants => {
                res.json(restaurants);
                //rests = rests.concat(restaurants)
            })
            .catch(err => res.status(400).json(err))
    
    
}

module.exports = {
    handleRests: handleRests,
    handleRestsList: handleRestsList
}
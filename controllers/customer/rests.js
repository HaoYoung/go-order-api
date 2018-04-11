const handleRests = (req, res, db) => {
    db.select('*').from('restaurants')
        .then(restaurants => {
            res.json(restaurants)
        })
        .catch(err => res.status(400).json('unable to get restaurants'))
}



const handleRestsList = (req, res, db) => {
    const { restTypes } = req.body;
    const rests = ['hello'];
    
    if ( !restTypes ){
        return res.status(400).json('incorrect form submission');
    }
    
    restTypes.map((type) => {
        db.select('*').from('restaurants')
            .where('type', '=', type)
            .then(restaurants => {
                //res.json(restaurants);
                res.json(rests.concat(restaurants));
            })
            .catch(err => res.status(400).json('unable to get restaurants'))
    })
    //.then(res.json(rests));
}

module.exports = {
    handleRests: handleRests,
    handleRestsList: handleRestsList
}
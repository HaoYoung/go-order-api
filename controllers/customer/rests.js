const handleRests = (req, res, db) => {
    db.select('*').from('restaurants')
        .then(restaurants => {
            res.json(restaurants)
        })
        .catch(err => res.status(400).json('unable to get restaurants'))
}

const handleRestsList = (req, res, db) => {
    const { restTypes } = req.body;
    const rests = [];
    
    if ( !restTypes ){
        return res.status(400).json('incorrect form submission');
    }else{
        return res.json(restTypes[0]);
    }
    
    for (var i=0; i<restTypes.length; i++){
        db.select('*').from('restaurants')
            .where('type', '=', type)
            .then(restaurants => {
                rests.concat(restaurants)
            })
            .catch(err => res.status(400).json('unable to get restaurants'))
    }
    res.json(rests);
}

module.exports = {
    handleRests: handleRests,
    handleRestsList: handleRestsList
}
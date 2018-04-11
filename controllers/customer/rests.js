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
    }

        db.select('*').from('restaurants')
            .where('type', '=', restTypes[0])
            .then(restaurants => {
                res.json(restaurants);
            })
            .catch(err => res.status(400).json('unable to get restaurants'))


}

module.exports = {
    handleRests: handleRests,
    handleRestsList: handleRestsList
}
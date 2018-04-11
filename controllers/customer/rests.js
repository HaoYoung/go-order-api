const handleRests = (req, res, db) => {
    db.select('*').from('restaurants')
        .then(restaurants => {
            res.json(restaurants)
        })
        .catch(err => res.status(400).json('unable to get restaurants'))
}

const rests = [];

const handleRestsList = (req, res, db) => {
    const { restTypes } = req.body;
    
    if ( !restTypes ){
        return res.status(400).json('incorrect form submission');
    }
    
    restTypes.map((type) => {
        db.select('*').from('restaurants')
            .where('type', '=', type)
            .then(restaurants => {
                //res.json(restaurants);
                this.rests = this.rests.concat(restaurants)
            })
            .catch(err => res.status(400).json('unable to get restaurants'))
    })
    .then(res.json(this.rests));
}

module.exports = {
    handleRests: handleRests,
    handleRestsList: handleRestsList
}
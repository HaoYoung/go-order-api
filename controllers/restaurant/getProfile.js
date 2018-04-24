const handleProfile = (req, res, db) => {
    const { id } = req.params;
    db.select('*').from('restaurants')
        .where('r_id', '=', id)
        .then(rest => {
            if (rest.length){
                res.json(rest[0]);
            } else {
                res.status(400).json('Not found');
            }
        })
        .catch(err => res.status(400).json('Error getting restaurant profile'))
}

module.exports = {
    handleProfile: handleProfile
}